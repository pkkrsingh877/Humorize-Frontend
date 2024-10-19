import { useContext, useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const logout = userContext?.logout;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box component="div" sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/'>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/jokes/add'>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Add Jokes'} />
                    </ListItemButton>
                </ListItem>
                {user &&
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/jokes/user/${user._id}`}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary={'My Jokes'} />
                        </ListItemButton>
                    </ListItem>
                }
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/jokes/user/favorite'>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Favorite'} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/feedback'>
                        <ListItemIcon>
                            <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Feedback'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/settings'>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)} // Open the drawer
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Humorize
                    </Typography>
                    {user ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                Welcome, {user.name}!
                            </Typography>
                            <Button color="inherit" onClick={logout} sx={{ color: 'white' }}>
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Button color="inherit">
                            <Link to="/auth/login" style={{ textDecoration: 'none', color: 'white' }}>
                                Login
                            </Link>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {/* Drawer Component */}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}
export default Navbar;