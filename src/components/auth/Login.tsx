import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const login = userContext?.login;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (login) {
            login(email, password);
        }
        navigate('/');
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
                {/* Button to navigate to the signup page */}
                <Button
                    variant="outlined"
                    onClick={() => navigate('/auth/signup')}
                    sx={{ marginTop: '1rem' }} // Optional margin for spacing
                >
                    Sign Up
                </Button>
            </FormControl>
        </Box>
    );
}

export default Login;