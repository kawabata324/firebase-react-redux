import React, {useState} from "react"
import styles from "./TweetInput.module.css"
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {auth, db, storage} from "../firebase/firebase";
import {Avatar, Button, IconButton} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {useAuth} from "../hooks/useAuth";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const TweetInput: React.FC = () => {
    const {getUniqueStr} = useAuth()
    const user = useSelector(selectUser)

    const [tweetMsg, setTweetMsg] = useState("")
    const [tweetImage, setTweetImage] = useState<File | null>(null)

    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setTweetImage(e.target.files![0])
            e.target.value = ""
        }
    }

    const sendTweet = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (tweetImage) {
            const fileName = getUniqueStr(16) + "_" + tweetImage!.name
            const uploadTweetImg = ref(storage, `images/${fileName}`)

            let url = ""
            try {
                await uploadBytes(uploadTweetImg, tweetImage!)
            } catch (e: any) {
                console.log(e.message)
            }

            url = await getDownloadURL(uploadTweetImg)

            try {
                await addDoc(collection(db, "posts"), {
                    avatar: user.photoUrl,
                    image: url,
                    text: tweetMsg,
                    timestamp: serverTimestamp(),
                    username: user.displayName
                })
            } catch (e: any) {
                console.log(e.message)
            }


        } else {
            await addDoc(collection(db, "posts"), {
                avatar: user.photoUrl,
                image: "",
                text: tweetMsg,
                timestamp: serverTimestamp(),
                username: user.displayName
            })
        }
        setTweetImage(null)
        setTweetMsg("")
    }
    return (
        <>
            <form onSubmit={sendTweet}>
                <div className={styles.tweet_form}>
                    <Avatar
                        className={styles.tweet_avatar}
                        src={user.photoUrl}
                        onClick={async () => {
                            await auth.signOut()
                        }}
                    />
                    <input
                        className={styles.tweet_input}
                        type="text"
                        placeholder="What's happening?"
                        autoFocus
                        value={tweetMsg}
                        onChange={(e) => setTweetMsg(e.target.value)}
                    />
                    <IconButton>
                        <label>
                            <AddPhotoAlternateIcon
                                className={
                                    tweetImage ? styles.tweet_addIconLoaded : styles.tweet_addIcon
                                }
                            />
                            <input
                                className={styles.tweet_hiddenIcon}
                                type="file"
                                onChange={onChangeImageHandler}
                            />
                        </label>
                    </IconButton>
                </div>
                <Button
                    type="submit"
                    disabled={!tweetMsg}
                    className={
                        tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
                    }
                >
                    Tweet
                </Button>
            </form>
        </>
    )
}
export default TweetInput