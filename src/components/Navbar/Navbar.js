import {AppBar, Box, Button, IconButton, Toolbar, Typography, Link as link, Stack} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {makeStyles} from "@mui/styles";
import {Link, useHistory} from "react-router-dom";
import {AuthService} from "pet-project-frontend-sharedcomponents";
import {useAtom} from "jotai";
import {userAtom} from "../../App";

const useStyles = makeStyles((theme) => ({

    appbar: {
        background: '#17c3b2 !important',
        boxShadow: 'none'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#f0e6ef',

    },

    colorText: {
        color: '#ffcb77',
    },

    buttonHover: {
        '&:hover': {
            backgroundColor: '#17c3b2',
            color: '#227c9d',
        },
        fontFamily: 'Nunito',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 'large'
    },
    hover: {
        '&:hover': {
            backgroundColor: '#17c3b2',
            color: '#227c9d',
        },

    }
}))

export default function Navbar() {
    const classes = useStyles()
    const [user, setUser] = useAtom(userAtom);
    const history = useHistory()

    const handleLogOut = () => {
        AuthService.logout();
        history.push("/login");
        setUser(false)
    };

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" className={classes.appbar} elevation={0}>
                    <Toolbar className={classes.appbarWrapper}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Typography fontWeight="bold" fontFamily="Nunito" variant="h4" component="div"
                                    sx={{flexGrow: 1}}>
                            <Link to={{pathname: '/'}} className={classes.hover}>
                                <span className={classes.colorText}> Pet</span>Hugs
                            </Link>
                        </Typography>

                        {user ? (
                                <Stack direction="row" spacing={2} padding='10px'>
                                    <Button sx={{'&:hover': {
                                            backgroundColor: '#17c3b2',
                                            color: '#227c9d',
                                        }, fontFamily: 'Nunito',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 'medium'}} onClick={() => history.push('/profile')}>
                                        Profile
                                    </Button>
                                    <Button sx={{'&:hover': {
                                            backgroundColor: '#17c3b2',
                                            color: '#227c9d',
                                        },
                                        fontFamily: 'Nunito',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 'medium'}} onClick={handleLogOut}>
                                        Log out
                                    </Button>
                                </Stack>

                            ) :
                            ( <Link to={{pathname: '/login'}} className={classes.buttonHover}>Login</Link>)}


                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}