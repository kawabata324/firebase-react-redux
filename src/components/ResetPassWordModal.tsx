import {Box, IconButton, Modal, TextField} from "@mui/material";
import styles from "./Auth.module.css";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import {useAuth} from "../hooks/useAuth";

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ResetPassWordModal: React.FC<Props> = (props) => {
    const {openModal, setOpenModal} = props

    const {
        resetEmail,
        setResetEmail,
        sendResetEmail
    } = useAuth()

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

    return (
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
        </Modal>
    )
}

export default ResetPassWordModal