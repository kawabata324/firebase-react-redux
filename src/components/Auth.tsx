import React, {useState} from 'react';
import styles from "./Auth.module.css"
import {useDispatch} from 'react-redux'
import {updateUserProfile} from "../features/userSlice"
import {auth, provider, storage} from "../firebase/firebase"
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
    IconButton,
    Modal
} from '@mui/material'

import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import CameraIcon from '@mui/icons-material/Camera';

const CopyRight: React.FC = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 5}}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center'
};

const theme = createTheme();

const Auth = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [avaterImage, setAvatarImage] = useState<File | null>(null)
    const [isLogin, setIsLogin] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [resetEmail, setResetEmail] = useState("")


    const sendResetEmail = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail)
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setResetEmail("")
        }
    }


    const onChagngeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0])
            e.target.value = ""
        }
    }

    const signInEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const getUniqueStr = (myStrong?: number): string => {
        let strong = 1000;
        if (myStrong) strong = myStrong;
        return (
            new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16)
        );
    }

    const signUpEmail = async () => {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password)
            let url = ""
            if (avaterImage) {
                const fileName = getUniqueStr(16) + "_" + avaterImage.name

                const storageRef = ref(storage, `avaters/${fileName}`)
                await uploadBytes(storageRef, avaterImage)
                    .then((snap) => console.log('upload a blob'))
                    .catch(e => console.log(e))

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


    const sighInGoogle = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            {/*<LockOutlinedIcon />*/}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {isLogin ? "Login" : "Register"}
                        </Typography>
                        <Box component="form" noValidate sx={{mt: 1}}>
                            {!isLogin && (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        autoComplete="userName"
                                        autoFocus
                                        value={userName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                                    />
                                    <Box textAlign="center">
                                        <IconButton>
                                            <label>
                                                <AccountCircleIcon
                                                    fontSize="large"
                                                    className={
                                                        avaterImage
                                                            ? styles.login_addIconLoaded
                                                            : styles.login_addIcon
                                                    }
                                                />
                                                <input
                                                    type="file"
                                                    className={styles.login_hiddenIcon}
                                                    onChange={onChagngeImageHandler}
                                                />
                                            </label>
                                        </IconButton>
                                    </Box>
                                </>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            <Button
                                disabled={
                                    isLogin ? !email || password.length < 6
                                        : !userName || !email || password.length < 6 || !avaterImage
                                }
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                startIcon={<EmailIcon/>}
                                onClick={
                                    isLogin ?
                                        signInEmail : signUpEmail
                                }
                            >
                                {isLogin ? "Login" : "Register"}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <span
                                        className={styles.login_reset}
                                        onClick={() => setOpenModal(true)}
                                    >
                                    Forgot password
                                    </span>
                                </Grid>
                                <Grid item>
                                    <span
                                        className={styles.login_toggleMode}
                                        onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Create new account?" : "Back to login"}
                                    </span>
                                </Grid>
                            </Grid>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            startIcon={<CameraIcon/>}
                            onClick={sighInGoogle}
                        >
                            SignIn with Google
                        </Button>
                    </Box>
                </Grid>
            </Grid>


            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.login_modal}>
                    <TextField
                        type="email"
                        name="email"
                        label="Reset Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <IconButton onClick={sendResetEmail}>
                        <SendIcon/>
                    </IconButton>

                </Box>
            </Modal>l

        </ThemeProvider>
    );
}

export default Auth