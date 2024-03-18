'use client'
import { CenteredCircularProgress } from "@/components/circular-loading/CenteredCircularProgress"
import { SimpleInput } from "@/components/input/input"
import { AuthContext } from "@/contexts/AuthContext"
import { signUpValidation } from "@/validationSchema/sign-up"
import { Box, Button, FormControl, Stack } from "@mui/material"
import { redirect, useRouter } from "next/navigation"
import { Fragment, useContext } from "react"

const SignUp = () => {

    const router = useRouter()

    const {handleSubmit, register, formState: {errors}, reset} = signUpValidation()

    const { handleSignUpSubmit, isLogged, isLoading }:any = useContext(AuthContext)

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
                    <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} >
                        <Stack direction='row' spacing={2} sx={{width: '90%'}}>
                            <SimpleInput type='text' name='firstName' placeholder="First Name" label='First Name' register={register} error={errors?.firstName} />
                            <SimpleInput type='text' name='lastName' placeholder="Last Name" label='Last Name' register={register} error={errors?.lastName} />
                        </Stack>
                        <SimpleInput type='email' name='email' placeholder="Your e-mail" label='E-mail' register={register} error={errors?.email} />
                        <SimpleInput type='password' name='password' placeholder="Your password" label='Password' register={register} error={errors?.password} />
                        <SimpleInput type='password' name='matchPassword' placeholder="Confirm your password" label='Confirm Password' register={register} error={errors?.matchPassword} />
                        <Button variant='contained' onClick={handleSubmit(handleSignUpSubmit)} sx={{margin: 'auto', display: 'block', width: '80%'}}>
                        Register
                        </Button>
                    </Stack>
                </FormControl>
            

            </Box>
        </Stack>
        }
    </Fragment>
    )
}

export default SignUp