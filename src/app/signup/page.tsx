'use client'
import { LeftArrowIcon } from "@/assets/icons/left-arrow-icon"
import { SignUpIcon } from "@/assets/icons/sign-up-icon"
import { CenteredCircularProgress } from "@/components/circular-loading/CenteredCircularProgress"
import { SimpleInput } from "@/components/input/input"
import { AuthContext } from "@/contexts/AuthContext"
import { signUpValidation } from "@/validationSchema/sign-up"
import { Box, Button, Card, FormControl, IconButton, Stack, Typography } from "@mui/material"
import { redirect, useRouter } from "next/navigation"
import { Fragment, useContext } from "react"

const SignUp = () => {

    const router = useRouter()

    const {handleSubmit, register, formState: {errors}} = signUpValidation()

    const { handleSignUpSubmit, isLogged, isLoading } = useContext(AuthContext)

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
                maxWidth: '400px',
                borderRadius: '10px',
                padding: '24px'
            }}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <IconButton onClick={() => router.push('/signin')}>
                        <LeftArrowIcon />
                    </IconButton>
                    <Typography variant='h5' fontWeight={600}>
                        Sign Up
                    </Typography>
                </Stack>
                <FormControl sx={{width: '100%', padding: '32px 0px'}}>
                    <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        spacing={5}
                    >
                        <Stack
                            direction='column'
                            justifyContent='center'
                            alignItems='center'
                            spacing={3}
                        >
                            <Stack
                                direction='row'
                                sx={{width: '95%'}}
                                justifyContent='space-between'
                            >
                                <SimpleInput
                                    type='text'
                                    name='firstName'
                                    placeholder="First Name"
                                    label='First Name'
                                    register={register}
                                    error={errors?.firstName}
                                />
                                <SimpleInput
                                    type='text'
                                    name='lastName'
                                    placeholder="Last Name"
                                    label='Last Name'
                                    register={register}
                                    error={errors?.lastName}
                                />
                            </Stack>
                            <SimpleInput
                                type='email'
                                name='email'
                                placeholder="Your e-mail"
                                label='E-mail'
                                register={register}
                                error={errors?.email}
                            />
                            <SimpleInput
                                type='password'
                                name='password'
                                placeholder="Your password"
                                label='Password'
                                register={register}
                                error={errors?.password}
                            />
                            <SimpleInput
                                type='password'
                                name='matchPassword'
                                placeholder="Confirm your password"
                                label='Confirm Password'
                                register={register}
                                error={errors?.matchPassword}
                            />
                        </Stack>
                        <Button
                            variant='contained'
                            onClick={handleSubmit(handleSignUpSubmit)}
                            startIcon={<SignUpIcon />}
                            sx={{
                                width: '80%'
                            }}>
                        Register
                        </Button>
                    </Stack>
                </FormControl>
            </Card>
        </Stack>
        }
    </Fragment>
    )
}

export default SignUp