import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', userData);
            if (response) {
                console.log('User logged in successfully:', response.data);
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <FormControl sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: '5rem'
            }}>
                <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>
                    Login
                </Typography>
                <TextField
                    id="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" startIcon={<LoginIcon />} type="submit">
                    Login
                </Button>
            </FormControl>
        </Box>
    );
}

export default Login;