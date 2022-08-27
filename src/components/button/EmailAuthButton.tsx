import {Button} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import {useAuth} from "../../hooks/useAuth";

const EmailAuthButton: React.FC = () => {
    const {
        email,
        password,
        userName,
        avatarImage,
        isLogin,
        signUpEmail,
        signInEmail
    } = useAuth()
    return (
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
    )
}

export default EmailAuthButton