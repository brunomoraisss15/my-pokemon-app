import { Fragment, useContext } from "react"
import { SideBar } from "../side-bar/SideBar"
import { Box, Container, useMediaQuery, useTheme } from "@mui/material"
import { NavBar } from "../nav-bar/NavBar"
import { AuthContext } from "@/contexts/AuthContext"
import { CenteredCircularProgress } from "../circular-loading/CenteredCircularProgress"


export const BaseLayout = ({children}: React.PropsWithChildren) => {

    const { isLogged }: any = useContext(AuthContext)

    const theme = useTheme()


    const mdUp = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Fragment>
            {isLogged ?
            <Fragment>
                <SideBar />
                <Box sx={{ ...(mdUp && {width: 'calc(100% - 250px)', position: 'relative', left: '250px'}) }}>
                    <NavBar />
                    <Container>
                        {children}
                    </Container>
                </Box>
            </Fragment>
            :
            <CenteredCircularProgress />
            }
        </Fragment>
    )
}