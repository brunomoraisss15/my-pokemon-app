'use client'
import { createContext, useEffect, useRef, useState } from "react";

interface SetttingsContextType {
    darkMode?: boolean | null | string;
    changeThemeMode?(): any; // Receives nothing and gives nothing
    drawerOpened?: boolean;
    toggleDrawer?(): any; // Receives nothing and gives nothing

}


export const SettingsContext = createContext<SetttingsContextType>({} as SetttingsContextType)

export const SettingsProvider = ({children}: React.PropsWithChildren): React.ReactNode => {

      
const [darkMode, setDarkMode] = useState<boolean | null | string>(false)

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

    return(
      <SettingsContext.Provider value={{ darkMode, changeThemeMode, drawerOpened, toggleDrawer }}>
            {children}
      </SettingsContext.Provider>
    )
}

export const SettingsConsumer = SettingsContext.Consumer