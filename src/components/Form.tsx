import {Box, Grid, IconButton} from "@mui/material";
import React, {useState} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Auth.module.css";
import GoogleSignInButton from "./button/GoogleSignInButton";
import EmailAuthButton from "./button/EmailAuthButton";
import BaseInput from "./input/BaseInput";
import GitHubSignInButton from "./button/GitHubSignInButton";

interface Props {
    isLogin: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<Props> = (props) => {
    const {isLogin, setIsLogin, setOpenModal} = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [avatarImage, setAvatarImage] = useState<File | null>(null)


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
                    <BaseInput
                        name="userName"
                        label="User Name"
                        value={userName}
                        setValue={setUserName}
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

            <BaseInput
                name="email"
                label="Email"
                value={email}
                setValue={setEmail}
            />
            <BaseInput
                name="password"
                label="Password"
                value={password}
                setValue={setPassword}
            />
            <EmailAuthButton
                email={email}
                password={password}
                userName={userName}
                avatarImage={avatarImage}
                isLogin={isLogin}
            />
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
            <GitHubSignInButton/>
        </Box>

    )
}

export default Form