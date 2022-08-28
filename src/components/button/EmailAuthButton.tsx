import {Button} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import React, {useEffect} from "react";
import {useAuth} from "../../hooks/useAuth";

interface Props {
    email: string
    password: string
    userName: string
    avatarImage: File | null
    isLogin: boolean
}

const EmailAuthButton: React.FC<Props> = (props) => {
    const auth = useAuth()
    const {
        signUpEmail,
        signInEmail
    } = useAuth()

    const {
        email,
        password,
        userName,
        avatarImage,
        isLogin,
    } = props

    return (
        <>
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
        </>
    )
}

export default EmailAuthButton