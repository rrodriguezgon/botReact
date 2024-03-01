// Imports REACT
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"

import {
    Container,
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material'

import { 
    VisibilityOff, 
    Visibility
} from '@mui/icons-material';

import { login } from "../../services/user";

// Imports Providers
import { useAuth } from "../../providers/authProvider";


export default function Login() {
    const [loginData, setLoginData] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const { setToken, setUsername } = useAuth();
    const navigate = useNavigate();

    const handleChange = useCallback((event) => {
        const target = event.target;
        const { value, name } = target;

        setLoginData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleLogin = useCallback(() => {
        login(loginData)
            .then(({ data }) => {
                if (data.token) {
                    setToken(data.token);
                    setUsername(loginData.username);
                    navigate("/");
                }
            });
    }, [loginData]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <Container maxWidth="sm">
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            name="username"
                            label="Username"
                            value={loginData.username}
                            margin="dense"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                name="password"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleLogin}> Login </Button>
            </CardActions>
        </Card>
    </Container>
};