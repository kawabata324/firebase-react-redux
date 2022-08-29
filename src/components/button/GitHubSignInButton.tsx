import {Button} from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import React from "react";
import {useAuth} from "../../hooks/useAuth";

const GitHubSignInButton: React.FC = () => {
    const {signInGitHub} = useAuth()

    return (
        <Button
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            startIcon={<CameraIcon/>}
            onClick={signInGitHub}
        >
            SignIn with GitHub
        </Button>
    )
}

export default GitHubSignInButton