import {
    createUserWithEmailAndPassword, sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import {auth, google, storage} from "../firebase/firebase";
import {useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateUserProfile} from "../features/userSlice";
import {useDispatch} from "react-redux";

export const useAuth = () => {
    /*
     * メール認証 State
     */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [avatarImage, setAvatarImage] = useState<File | null>(null)
    const [resetEmail, setResetEmail] = useState("")
    const [isLogin, setIsLogin] = useState(true)


    const dispatch = useDispatch()


    /*
     * Email Password　を用いたユーザー登録
     *
     */
    const signUpEmail = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            let url = ""
            if (avatarImage) {
                const storageRef = await upLoadAvatarImage()

                url = await getDownloadURL(storageRef)
                await updateProfile(auth.currentUser!, {
                    displayName: userName,
                    photoURL: url
                })

                await dispatch(updateUserProfile({
                    displayName: userName,
                    photoUrl: url
                }))

            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    /*
    * Email Password を用いたログイン
    * Todo メール認証を機能として加える
    * */
    const signInEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    /*
    * Google 認証
    */
    const sighInGoogle = async () => {
        try {
            await signInWithPopup(auth, google)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    /*
     * Password　reset Email
     */

    const sendResetEmail = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail)
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setResetEmail("")
        }
    }


    /*
     * このHooksで使用するが、外部に出す必要のないPrivate メソッド
     */

    const getUniqueStr = (myStrong?: number): string => {
        let strong = 1000;
        if (myStrong) strong = myStrong;
        return (
            new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16)
        );
    }

    const upLoadAvatarImage = async () => {
        const fileName = getUniqueStr(16) + "_" + avatarImage!.name

        const storageRef = ref(storage, `avatars/${fileName}`)
        try {
            await uploadBytes(storageRef, avatarImage!)
        } catch (e: any) {
            console.log(e.message)
        }

        return storageRef
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        userName,
        setUserName,
        avatarImage,
        setAvatarImage,
        resetEmail,
        setResetEmail,
        isLogin,
        setIsLogin,
        signUpEmail,
        signInEmail,
        sighInGoogle,
        sendResetEmail
    }
}

