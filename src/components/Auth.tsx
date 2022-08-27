import React, {useState} from 'react';

import {
    Avatar,
    CssBaseline,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ResetPassWordModal from "./ResetPassWordModal";
import Form from "./Form";
import {useAuth} from "../hooks/useAuth";


const theme = createTheme();

const Auth = () => {
    const [openModal, setOpenModal] = useState(false)

    const {isLogin, setIsLogin} = useAuth()


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
                        <Form
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                            setOpenModal={setOpenModal}
                        />
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