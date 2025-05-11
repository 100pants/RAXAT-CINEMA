import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/navBar/NavBar';
import Footer from './ui/footer/Footer';
import { Box } from '@mui/material';

const Layout = () => {
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <NavBar />
            <Box component="main" sx={{ 
                flex: 1,
                paddingLeft: { xs: 2, sm: 4 },
                paddingRight: { xs: 2, sm: 4 }
            }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;