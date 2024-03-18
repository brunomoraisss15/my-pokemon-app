'use client'
import { CenteredCircularProgress } from "@/components/circular-loading/CenteredCircularProgress"
import { SimpleInput } from "@/components/input/input"
import { AuthContext } from "@/contexts/AuthContext"
import { loginValidation } from "@/validationSchema/auth"
import { Box, Button, FormControl, Stack } from "@mui/material"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Fragment, useContext} from "react"
import GoogleButton from 'react-google-button'


const SignIn = () => {

    const { isLogged, handleGoogleSignIn, handleSubmitForm, isLoading}:any = useContext(AuthContext)

    const {handleSubmit, register, formState: {errors}, reset} = loginValidation()


    return (
        <Fragment>
            {isLogged ? redirect('/')
            : isLoading ? <CenteredCircularProgress /> :
            <Stack justifyContent='center' alignItems='center' sx={{
                width: '100%',
                height: '100vh'
            }}>
                <Box sx={{
                    width: '300px',
                    borderRadius: '10px',
                    border: '2px solid orange'
                }}>
                    <FormControl sx={{width: '100%', padding: '32px 0px'}}>
                        <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} >
                            <SimpleInput type='email' name='email' placeholder="Please enter your e-mail" label='E-mail' register={register} error={errors?.email} />
                            <SimpleInput type='password' name='password' placeholder="Please enter your password" label='Password' register={register} error={errors?.password} />
                            <Button variant='contained' onClick={handleSubmit(handleSubmitForm)} sx={{margin: 'auto', display: 'block', width: '80%'}}>
                            {'Login'}
                            </Button>
                            <GoogleButton onClick={handleGoogleSignIn} />
                        </Stack>
                    </FormControl>
                    <Link href='/signup'>Cadastrar</Link>   
                </Box>
            </Stack>
            }
        </Fragment>
        
    )
}

export default SignIn