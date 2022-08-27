import React, {useState} from 'react';
import styles from "./Auth.module.css"

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
    IconButton,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraIcon from '@mui/icons-material/Camera';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAuth} from "../hooks/useAuth";
import ResetPassWordModal from "./ResetPassWordModal";


const theme = createTheme();

const Auth = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        userName,
        setUserName,
        avatarImage,
        setAvatarImage,
        signUpEmail,
        signInEmail,
        sighInGoogle,
    } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [openModal, setOpenModal] = useState(false)


    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0])
            e.target.value = ""
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
                            <LockOutlinedIcon/>
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
                                                        avatarImage
                                                            ? styles.login_addIconLoaded
                                                            : styles.login_addIcon
                                                    }
                                                />
                                                <input
                                                    type="file"
                                                    className={styles.login_hiddenIcon}
                                                    onChange={onChangeImageHandler}
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
                                        : !userName || !email || password.length < 6 || !avatarImage
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
                    </Box>
                </Grid>
            </Grid>

            {/*Reset Password Modal*/}
            <ResetPassWordModal
                openModal={openModal}
                setOpenModal={setOpenModal}
            />


        </ThemeProvider>
    );
}

export default Auth