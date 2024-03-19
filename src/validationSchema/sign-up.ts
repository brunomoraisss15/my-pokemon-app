import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const signUpSchema = Yup.object({
    firstName: Yup.string().required('First name field is missing').max(20, 'First name is too large'),
    lastName: Yup.string().required('Last name field is missing').max(20, 'Last name is too large'),
    email: Yup.string().required('E-mail field is missing').email('Please, enter valid e-mail'),
    password: Yup.string().required('Password field is missing').min(8, 'The password must have att least 8 characters'),
    matchPassword: Yup.string().required('Password field is missing').min(8, 'The password must have att least 8 characters').oneOf([Yup.ref('password')], "Your password dosn't match the first")
})

export const signUpValidation = () => useForm({
    resolver: yupResolver(signUpSchema)
})