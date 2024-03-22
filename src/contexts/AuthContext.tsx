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

interface AuthContextType {
    isLoading?: boolean;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitForm: any; // Any to prevent problem with YUP authentication
    handleGoogleSignIn?(): any; // Receives nothing and gives nothing
    handleSignOut?(): any; // Receives nothing and gives nothing
    handleSignUpSubmit: any; // Any to prevent problem with YUP authentication
    isLogged: boolean;
    userInfo: any;


}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

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

    interface AuthContextType {
        isLoading?: boolean;
        setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
        handleSubmitForm?(values: signInSubmitFormsType): any;
        handleGoogleSignIn?(): any;
        handleSignOut?(): any;
        handleSignUpSubmit?(values: signUpSubmitFormsType): any;
        isLogged: boolean;
        userInfo: any;


    }

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

