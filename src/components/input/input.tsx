import { InputFieldType } from "@/types/FormTypes"
import { Stack, TextField, Typography } from "@mui/material"

export const SimpleInput = ({type, placeholder, label, name, register, error}:InputFieldType) => {
    return (
        <Stack
            alignItems='center'
            sx={{
                position: 'relative',
                width: '100%'
            }}
        >
            <TextField
                {...register(name)}
                type={type}
                placeholder={placeholder}
                label={label}
                sx={{width: '90%'}}
                error={!!error}
            />
            <Typography
                variant="caption"
                style={{
                    position: 'absolute',
                    top: '55px',
                    color:'red',
                    width: '90%'
                }}
            >
                {error && error.message}
            </Typography>
        </Stack>
    )
}