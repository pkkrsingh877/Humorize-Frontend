import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const signup = userContext?.signup;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (signup) {
            signup(name, email, password);
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
                    Signup
                </Typography>
                <TextField
                    id="outlined"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" startIcon={<AppRegistrationIcon />} type='submit'>
                    Signup
                </Button>
                {/* Button to move to login page */}
                <Button
                    variant="outlined"
                    onClick={() => navigate('/auth/login')}
                    sx={{ marginTop: '1rem' }} // Optional margin for spacing
                >
                    Login
                </Button>
            </FormControl>
        </Box>
    );
}

export default Signup;