import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const loginSchema = Yup.object({
    email: Yup.string().email('Please, enter valid e-mail').max(100).required('This field is required'),
    password: Yup.string().required('This field is required').min(8, 'Type at least 8 characters')
})

export const loginValidation = () => useForm({
    resolver: yupResolver(loginSchema)
})