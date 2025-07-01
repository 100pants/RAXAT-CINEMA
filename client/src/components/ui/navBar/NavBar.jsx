import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Stack,
  Button,
  Drawer,
  Slide,
  useScrollTrigger
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MOVIE_LISTS, TOP_LISTS, iconComponents } from '../../../constants';
import Search from '../search/Search';
import { ColorModeContext } from '../../../context/ToggleColorMode';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../features/authSlice';

const Icon = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return IconComponent ? <IconComponent /> : null;
};

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavBar = () => {
  const [isOpen, setOpen] = React.useState(false);
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ paddingLeft: { xs: 2, sm: 4 } }}>
            <IconButton
              color="inherit"
              onClick={handleOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{ color: 'white', textDecoration: 'none' }}
                variant="h5"
                component={RouterLink}
                to="/"
              >
                RAXAT-CINEMA
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Search />
                <IconButton color="inherit" onClick={toggleColorMode}>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>

              {isAuthenticated ? (
                <Button color="inherit" onClick={() => navigate('/favorites')}>
                  Избранное
                </Button>
              ) : (
               null
              )}

              {isAuthenticated ? (
                <Button color="inherit" onClick={handleLogout}>
                  Выйти
                </Button>
              ) : (
                <Button color="inherit" onClick={() => navigate('/registration')}>
                  Регистрация
                </Button>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar />

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            zIndex: (theme) => theme.zIndex.appBar,
            mt: '64px',
            height: 'calc(100vh - 64px)',
          }
        }}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {TOP_LISTS.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.url}
                  onClick={handleOpen}
                >
                  <ListItemIcon>
                    <Icon iconName={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {MOVIE_LISTS.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.url}
                  onClick={handleOpen}
                >
                  <ListItemIcon>
                    <Icon iconName={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default NavBar;