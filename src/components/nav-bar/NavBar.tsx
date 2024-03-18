import { MenuListIcon } from "@/assets/icons/menu-list-icon"
import { SignOutIcon } from "@/assets/icons/sign-out-icon"
import { AuthContext } from "@/contexts/AuthContext"
import { SettingsContext } from "@/contexts/SettingsContext"
import { usePopover } from "@/hooks/usePopover"
import { Avatar, Box, Button, IconButton, Link, ListItemIcon, MenuItem, Popover, Stack, SvgIcon, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useContext } from "react"



export const NavBar = () => {
    const { open, handleClose, handleOpen, anchorRef} = usePopover()
    const { handleSignOut, userInfo }: any = useContext(AuthContext)
    const { toggleDrawer }: any = useContext(SettingsContext)
    const arrayName: Array<string> | string = userInfo?.displayName ? userInfo?.displayName.split(' ') : ''
    const firstName: string = arrayName.length >= 1 ? arrayName[0] : ''
    const lastName: string = arrayName.length > 1 ? arrayName[arrayName.length - 1] : ''
    const email: string = userInfo?.email
    
    const getFirstLetter = (value:any) => {
        return value ? value[0].toUpperCase() : ''
    }
    const theme = useTheme()
    const mdUp = useMediaQuery(theme.breakpoints.up('md'))
    console.log(arrayName)
    return (
        <Box sx={{height: '64px', padding: '12px 32px 12px 16px', width: '100%'}}>
            <Stack justifyContent={!mdUp ? 'space-between' : 'flex-end'} direction='row' alignItems='center'>
            {!mdUp &&
                <IconButton onClick={toggleDrawer} sx={{ width: '40px', height: '40px'}}>
                    <Box sx={{color: 'darkOrange', position: 'relative', top: '3.5px'}}>
                        <MenuListIcon />
                    </Box>
                </IconButton>
                }
                <Link onClick={(event: any) => handleOpen(event)}>
                    <Avatar sx={{
                        bgcolor: 'darkorange',
                        color: '#FFF',
                        fontSize: '18px',
                        cursor: 'pointer',
                        width: mdUp ? '40px' : '36px',
                        height: mdUp ? '40px' : '36px',
                    }}>
                        {getFirstLetter(firstName)}
                        {getFirstLetter(lastName)}
                    </Avatar>
                </Link>
            </Stack>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                PaperProps={{
                    sx: {
                        width: '230px',
                        borderRadius: '10px',
                        marginTop: '16px',
                        position: 'relative'
                    }
                    }}>
                <Stack direction='column' justifyContent='space-between' alignItems='center' sx={{width: 'auto', margin: '16px 16px 0 16px'}} spacing={1}>
                    <Avatar
                    src={userInfo?.photoURL}
                    sx={{
                        bgcolor: 'darkorange',
                        color: '#FFF',
                        fontSize: '18px'
                    }}>
                        {getFirstLetter(firstName)}
                        {getFirstLetter(lastName)}
                    </Avatar>
                    <Typography>
                        {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography variant="caption" sx={{wordBreak: 'break-word'}}>
                        {email}
                    </Typography>
                </Stack>
                <MenuItem sx={{
                    position: 'relative',
                    bottom: 0,
                    width: '100%',
                    paddingY: '4px',
                    marginTop: '24px',
                    fontWeight: 'bold',
                    fontSize: '14px'
                    }}
                    onClick={handleSignOut}
                    >
                        <ListItemIcon sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            gap: '8px'
                        }}>
                            <SvgIcon sx={{ width: '21px', height: '21px'}}>
                                <SignOutIcon />
                            </SvgIcon>
                            
                            <Typography color={theme.palette.text.primary} sx={{fontSize: '14px'}}>
                                Sair
                            </Typography>
                           
                        </ListItemIcon>
                </MenuItem>
            </Popover>
        </Box>
    )
}