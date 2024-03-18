import { PokemonListIcon } from "@/assets/icons/pokemon-list-icon"
import { PokemonListSearch } from "@/assets/icons/pokemon-search-icon"
import { SettingsContext } from "@/contexts/SettingsContext"
import { Box, Drawer, Stack, SvgIcon, Switch, Typography, useMediaQuery, useTheme } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useContext } from "react"


const dashItems = [
    {
        title: 'Pokemon List',
        icon:
        <SvgIcon>
            <PokemonListIcon />
        </SvgIcon>,
        path: '/'
    },
    {
        title: 'PokeSearch',
        icon:
        <SvgIcon>
            <PokemonListSearch />
        </SvgIcon>,
        path: '/pokemon-search'
    }
]


export const SideBar = () => {
    const { darkMode, changeThemeMode, drawerOpened, toggleDrawer }: any = useContext(SettingsContext)
    const pathname = usePathname()
    const theme = useTheme()
    const mdUp = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <Drawer
        sx={{
            '& .MuiDrawer-paper': {
              width: '250px',
              boxSizing: 'border-box',
              background: '#17181a',
              padding: '24px',
              display: mdUp || drawerOpened ? '' : 'none'
            },
            '& .dash-text-general-style': {
                color: '#FFF'
            }
          }}
            open={mdUp ? true : drawerOpened}
            variant={mdUp ? 'persistent' : 'temporary'}
            anchor="left"
            onClose={toggleDrawer}
        >
            <Box sx={{height: '100vh', position: 'relative'}}>
            <Stack direction='row' spacing={2}>
                <Link href={'/'}>
                    <Box sx={{
                        height: '44px',
                        width: '44px',
                        '& img': {
                            width: '100%',
                            borderRadius: '6px'
                        }
                    }}>
                        <img alt={'MP'} src={'poke-logo4.png'} />
                    </Box>
                </Link>
                <Stack justifyContent='center' alignItems='center'>
                        <Typography sx={{fontFamily:'Changa One', fontSize: '18px'}} className="dash-text-general-style">
                            My Pokemon
                        </Typography>
                        <Typography sx={{ fontSize: '10px', color: theme.palette.grey[400] }} alignSelf='flex-start'>
                            Find Your Pokemon
                        </Typography>
                </Stack>
            </Stack>
            <Stack direction='column' spacing={2} sx={{
                padding: '48px 0',
                '& .item-dash-active': {
                    padding: '4px 8px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& .MuiTypography-root': {
                        color:  '#FFF',
                        fontFamily: 'Changa One'
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'darkorange'
                    }
                 
                },
                '& .item-dash-unselected': {
                    padding: '4px 8px',
                    borderRadius: '10px',
                    ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    },
                    '& .MuiTypography-root': {
                        color:  theme.palette.grey[400],
                        fontFamily: 'Changa One'
                    },
                    '& .MuiSvgIcon-root': {
                        color: theme.palette.grey[400]
                    }
                }
                
            }}>
                {dashItems.map((item, index) => {

                    return (
                        <Fragment key={index}>
                            <Link href={item.path}>
                                <Box
                                    className={pathname === item.path ? "item-dash-active" : "item-dash-unselected"}
                                >
                                    <Stack direction='row' spacing={2}>
                                    {item.icon}
                                    <Typography>
                                        {item.title}
                                    </Typography>
                                    </Stack>
                                </Box>
                            </Link>
                        </Fragment>
                    )
                })}
            </Stack>
            <Box sx={{position: 'absolute', bottom: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                <Typography color={theme.palette.grey[600]} sx={{fontSize: "16px"}}>
                    Dark Mode?
                </Typography>
                <Switch checked={!!darkMode} color="warning" onChange={changeThemeMode} />
            </Box>
            </Box>
        </Drawer>
    )
}