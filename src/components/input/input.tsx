import { InputFieldType } from "@/types/FormTypes";
import { Box, Input, InputLabel, TextField } from "@mui/material";


export const SimpleInput = ({type, placeholder, label, name, register, error}:InputFieldType) => {
    return (
            <TextField {...register(name)} type={type} placeholder={placeholder} label={label} sx={{width: '90%'}} error={!!error} helperText={error && error.message} />
    )
}