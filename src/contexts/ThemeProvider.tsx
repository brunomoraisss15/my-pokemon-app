'use client'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

import { ThemeOptions } from '@mui/material/styles';
import { useContext } from "react";
import { SettingsContext } from "./SettingsContext";
import { MyThemeContextType } from "@/types/MyThemeContextType";


export const MyThemeProvider = ({children}: React.PropsWithChildren) => {  

    const { darkMode }: any = useContext(SettingsContext)

    const themeOptions: ThemeOptions = {
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: '#ff8c00',
          contrastText: '#fff',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: darkMode ? '#121212' : '#F3F3F3'
        }
      }
    }

    const theme = createTheme(themeOptions)

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}