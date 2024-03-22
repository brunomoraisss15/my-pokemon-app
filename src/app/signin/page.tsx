'use client'
import { GoogleIcon } from "@/assets/icons/google-icon"
import { SignInIcon } from "@/assets/icons/sign-in-icon"
import { CenteredCircularProgress } from "@/components/circular-loading/CenteredCircularProgress"
import { SimpleInput } from "@/components/input/input"
import { AuthContext } from "@/contexts/AuthContext"
import { loginValidation } from "@/validationSchema/auth"
import { Box, Button, Card, IconButton, Stack, Typography, Link, useMediaQuery, useTheme } from "@mui/material"
import { redirect, useRouter } from "next/navigation"
import { Fragment, useContext} from "react"

const SignIn = () => {

    const { isLogged, handleGoogleSignIn, handleSubmitForm, isLoading} = useContext(AuthContext)

    const router = useRouter()

    const {handleSubmit, register, formState: {errors}} = loginValidation()

    const theme = useTheme()

    const mdUp = useMediaQuery(theme.breakpoints.up('md'))


    return (
        <Fragment>
            {isLogged ? redirect('/')
            : isLoading ? <CenteredCircularProgress /> :
            <Stack
                justifyContent='center'
                alignItems='center'
                sx={{
                width: '100%',
                height: '100vh'
                }}
            >
                <Card sx={{
                    width: mdUp ? '600px' : '300px',
                    borderRadius: '10px'
                }}>
                    <Stack
                        direction='row'
                        width='100%'
                    >
                        {mdUp &&
                            <Box
                                width='50%'
                                sx={{
                                '& img': {
                                    width: '100%',
                                    height: '100%'
                                }
                            }}>
                                <img alt='Pokemon Image' src='pokemon-horizons.png' />
                            </Box>
                        }
                        <Box width={mdUp ? '50%' : '100%'} sx={{padding: '24px'}}>
                            <Typography variant='h5' fontWeight={600}>
                                Sign In
                            </Typography>
                            <Box sx={{width: '100%', padding: '32px 0px'}}>
                                <Stack
                                    direction='column'
                                    justifyContent='center'
                                    alignItems='center'
                                    spacing={3}
                                >
                                    <SimpleInput
                                        type='email'
                                        name='email'
                                        placeholder="Please enter your e-mail"
                                        label='E-mail'
                                        register={register}
                                        error={errors?.email}
                                    />
                                    <SimpleInput
                                        type='password'
                                        name='password'
                                        placeholder="Please enter your password"
                                        label='Password'
                                        register={register}
                                        error={errors?.password}
                                    />
                                    <Button
                                        variant='contained'
                                        onClick={handleSubmit(handleSubmitForm)}
                                        startIcon={<SignInIcon />}
                                        sx={{
                                            width: '80%'
                                        }}>
                                    Sign In
                                    </Button>
                                    <Stack direction='row' spacing={2} alignItems='center'>
                                        <Typography variant='caption' fontWeight={600}>
                                            {'Or Sign In With Google'}
                                        </Typography>
                                        <IconButton
                                            sx={{border: '0.5px solid orange'}}
                                            onClick={handleGoogleSignIn}
                                            >
                                            <GoogleIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Stack alignItems='center'>
                                <Button
                                    sx={{textDecoration: 'none', cursor: 'pointer' }}
                                    onClick={() =>{router.push('/signup')}}>{'Sign Up'}
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Card>
            </Stack>
            }
        </Fragment>
        
    )
}

export default SignIn