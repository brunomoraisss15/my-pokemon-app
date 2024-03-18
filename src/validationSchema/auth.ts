import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const loginSchema = Yup.object({
    email: Yup.string().email('Please, enter valid e-mail').max(100).required('This field is required'),
    password: Yup.string().min(8, 'The password has at least 8 characters'). required('This field is required')
})

export const loginValidation = () => useForm({
    resolver: yupResolver(loginSchema)
})