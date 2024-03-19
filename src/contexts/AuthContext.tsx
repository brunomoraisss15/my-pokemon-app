'use client'
import { auth } from "@/services/firebase";
import { GoogleAuthProvider, browserLocalPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

interface signInSubmitFormsType {
    email: string;
    password: string;
}

interface signUpSubmitFormsType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    matchPassword: string;
}

export const AuthContext = createContext({})

export const AuthProvider = ({children}: React.PropsWithChildren) => {


    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useRouter()

    const pathname = usePathname()

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        await setPersistence(auth, browserLocalPersistence)
    }

    
    const handleSubmitForm = async (values: signInSubmitFormsType) => {
        try {
        await signInWithEmailAndPassword(auth, values.email, values.password)
        await setPersistence(auth, browserLocalPersistence)
        }
        catch {
            toast.error('Invalid Email or Password')
        }
    }

    const handleSignOut = async () => {
        signOut(auth)
        setUserInfo({})
        setIsLogged(false)
        setIsLoading(true)
        router.push('/signin')
        
    }

    const handleSignUpSubmit = async (values: signUpSubmitFormsType) => {
        try {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        handleUpdate(values.firstName, values.lastName)
        }
        catch {
        toast.error('Error. Check for typos or try again later!')
        }
        
    }

    const handleUpdate = async (firstName: string, lastName: string) => {
        const checkauth: any = getAuth()
        await updateProfile(checkauth?.currentUser, {
            displayName: `${firstName} ${lastName}`
        })
        toast.success('Success!')
        router.push('/signin')
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setIsLogged(true)
            setUserInfo(user)
            setIsLoading(false)
          }
          else {
            
            pathname !== '/signup' && router.push('/signin')
            setIsLoading(false)
          }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                setIsLoading,
                handleSubmitForm,
                handleGoogleSignIn,
                handleSignOut,
                handleSignUpSubmit,
                isLogged,
                userInfo,
                isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const AuthConsumer = AuthContext.Consumer

