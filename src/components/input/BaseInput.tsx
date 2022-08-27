import React from "react";
import {TextField} from "@mui/material";

interface Props {
    name: string
    label: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const BaseInput: React.FC<Props> = (props) => {
    const {name, label, value, setValue} = props
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={name}
            autoFocus
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
    )
}

export default BaseInput