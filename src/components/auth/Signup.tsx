import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submit event fired")

        const userData = { name, email, password };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
            if (response) {
                console.log('User signed up successfully:', response.data);
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
            </FormControl>
        </Box>
    );
}

export default Signup;