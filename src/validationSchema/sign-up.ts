import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const signUpSchema = Yup.object({
    firstName: Yup.string().max(20, 'First name is too large').required('First name field is missing'),
    lastName: Yup.string().max(20, 'Last name is too large').required('Last nme field is missing'),
    email: Yup.string().email('Please, enter valid e-mail').required('E-mail field is missing'),
    password: Yup.string().min(8, 'The password must have att least 8 characters'). required('Password field is missing'),
    matchPassword: Yup.string().min(8, 'The password must have att least 8 characters'). required('Password field is missing').oneOf([Yup.ref('password')], "Your password dosn't match the first")
})

export const signUpValidation = () => useForm({
    resolver: yupResolver(signUpSchema)
})