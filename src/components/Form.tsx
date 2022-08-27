import {Box, Button, Grid, IconButton, TextField} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Auth.module.css";
import {useAuth} from "../hooks/useAuth";
import GoogleSignInButton from "./button/GoogleSignInButton";
import EmailAuthButton from "./button/EmailAuthButton";

interface Props {
    isLogin: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<Props> = (props) => {
    const {isLogin, setIsLogin, setOpenModal} = props


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
    } = useAuth()

    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0])
            e.target.value = ""
        }
    }
    return (
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
                autoComplete="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <EmailAuthButton/>
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
            <GoogleSignInButton/>
        </Box>

    )
}

export default Form