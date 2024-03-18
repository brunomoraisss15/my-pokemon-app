'use client'
import { createContext, useEffect, useRef, useState } from "react";


export const SettingsContext = createContext({})

export const SettingsProvider = ({children}: React.PropsWithChildren): React.ReactNode => {

      
const [darkMode, setDarkMode] = useState<boolean | null | string >(false)

const [drawerOpened, setDrawerOpened] = useState<boolean>(false)

const toggleDrawer = () => {
    setDrawerOpened((previous) => !previous)
}

const changeThemeMode = () => {
    if (!!darkMode){
        localStorage.removeItem('darkMode')
        setDarkMode(false)
    }
    else {
        localStorage.setItem('darkMode', 'dark')
        setDarkMode(true)
    }
}

useEffect(() => {
    setDarkMode(localStorage.getItem('darkMode'))
}, [])

console.log(darkMode)

    return(
      <SettingsContext.Provider value={{ darkMode, changeThemeMode, drawerOpened, toggleDrawer }}>
            {children}
      </SettingsContext.Provider>
    )
}

export const SettingsConsumer = SettingsContext.Consumer