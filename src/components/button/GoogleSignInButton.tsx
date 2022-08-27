import {Button} from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import React from "react";
import {useAuth} from "../../hooks/useAuth";

const GoogleSignInButton: React.FC = () => {
    const {sighInGoogle} = useAuth()
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            startIcon={<CameraIcon/>}
            onClick={sighInGoogle}
        >
            SignIn with Google
        </Button>
    )
}

export default GoogleSignInButton