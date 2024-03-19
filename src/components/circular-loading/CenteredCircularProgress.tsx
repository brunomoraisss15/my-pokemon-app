import { CircularProgress, Stack } from "@mui/material"

export const CenteredCircularProgress = () => {

    return (
    <Stack
        sx={{
            width: '100%',
            height: '100vh'
        }}
        justifyContent='center'
        alignItems='center'
    >
        <CircularProgress sx={{color: 'orange'}}/>
    </Stack>
    )
}