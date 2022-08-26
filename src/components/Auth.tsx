import React, {useState} from 'react';
import styles from "./Auth.module.css"
import {useDispatch} from 'react-redux'
import {auth, provider, storage} from "../firebase/firebase"
import {signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

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
} from '@mui/material'

import EmailIcon from '@mui/icons-material/Email';


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

const theme = createTheme();

const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    const signInEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const signUpEmail = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
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
                                    <span className={styles.login_reset}>
                                    Forgot password
                                    </span>
                                </Grid>
                                <Grid item xs>
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
                            onClick={sighInGoogle}
                        >
                            SignIn with Google
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Auth