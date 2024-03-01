// Imports REACT
import React from "react";
import { Navigate, Outlet } from "react-router-dom"

// Imports Material UI
import { Grid } from '@mui/material';

// Imports Components Core
import NavbarComponent from '../../components/Navbar';

// Imports Providers
import { useAuth } from "../../providers/authProvider";

export default function MainLayout() {
    const { token } = useAuth();

    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    return <Grid>
        <NavbarComponent />
        <main>
            <Outlet />
        </main>
    </Grid>
}
