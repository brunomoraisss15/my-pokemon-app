'use client'
import { auth } from "@/services/firebase";
import { GoogleAuthProvider, browserLocalPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

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
        await signInWithPopup(auth, provider).then((response) => {
            console.log('Log In - Success - Google')
        }).catch((error) => console.log(error))
        await setPersistence(auth, browserLocalPersistence)

    }

    
    const handleSubmitForm = async (values: signInSubmitFormsType) => {
        console.log(values)
        await signInWithEmailAndPassword(auth, values.email, values.password).then((response) => {
            console.log('Log In - Success - Email and Password')
           
        })
        await setPersistence(auth, browserLocalPersistence)
        
    }

    const handleSignOut = async () => {
        signOut(auth)
        console.log('Log Out - Success')
        setUserInfo({})
        setIsLogged(false)
        setIsLoading(true)
        router.push('/signin')
        
    }

    const handleSignUpSubmit = async (values: signUpSubmitFormsType) => {
        console.log(values)
        await createUserWithEmailAndPassword(auth, values.email, values.password).then((response) => {
            console.log(response)
        }).catch((error) => console.log(error))
        handleUpdate(values.firstName, values.lastName)
        
    }

    const handleUpdate = async (firstName: string, lastName: string) => {
        const checkauth: any = getAuth()
        await updateProfile(checkauth?.currentUser, {
            displayName: `${firstName} ${lastName}`
        })
        router.push('/signin')
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setIsLogged(true)
            setUserInfo(user)
            console.log(user)
            setIsLoading(false)
          }
          else {
            
            pathname !== '/signup' && router.push('/signin')
            console.log('User is not logged')
            setIsLoading(false)
          }
        })
    }, [])

    return (
        <AuthContext.Provider value={{handleSubmitForm, handleGoogleSignIn, handleSignOut, handleSignUpSubmit, isLogged, userInfo, isLoading}}>
            {children}
        </AuthContext.Provider>
    )

}

export const AuthConsumer = AuthContext.Consumer

