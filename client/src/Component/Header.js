import React from 'react'
import { AppBar, Toolbar, Box, List, ListItem, Button, Typography } from '@mui/material'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const signOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }
    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Box sx={
                    {
                        display: 'flex',
                        alignItems: "center",

                    }
                }>
                    <NewspaperIcon sx={{ display: 'flex', mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: { xs: "0rem", sm: "0.3rem" },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to={'/home'} style={{ textDecoration: "none", color: "#ffff" }}>
                            NoteBook
                        </Link>
                    </Typography>
                </Box>
                <Box sx={{ ml: "auto" }}>
                    <List>
                        {
                            localStorage.getItem("token") ? (<ListItem sx={{ padding: "0px", gap: "20px" }}>
                                <AddBoxIcon sx={{ fontSize: "30px", cursor: "pointer" }} onClick={() => { navigate('/addNote') }} />
                                <Button variant="contained" onClick={signOut} sx={{ fontSize: { xs: '0.8rem', sm: "0.875rem" } }}>
                                    Sign Out
                                </Button>
                            </ListItem>) : (<ListItem sx={{ padding: "0px", gap: "20px" }}>
                                {
                                    location.pathname === "/register" ? (
                                        <Button variant="contained" onClick={() => { navigate('/') }}>
                                            Sign In
                                        </Button>
                                    ) : (
                                        <Button variant="contained" onClick={() => { navigate('/register') }}>
                                            Sign Up
                                        </Button>
                                    )
                                }

                            </ListItem>)
                        }

                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
