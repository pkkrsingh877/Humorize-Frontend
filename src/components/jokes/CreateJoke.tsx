import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const CreateJoke = () => {
    const [joke, setJoke] = useState('');
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (user) {
                const token = localStorage.getItem('token');
                const jokeData = { joke, creator: user._id };
                await axios.post('http://localhost:5000/api/jokes', jokeData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the headers
                    }
                });
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
                    Create Joke
                </Typography>
                <TextField
                    id="outlined-joke-input"
                    label="Joke"
                    type="joke"
                    value={joke}
                    onChange={(e) => setJoke(e.target.value)}
                    required
                />
                <Button variant="contained" startIcon={<LoginIcon />} type="submit">
                    Submit
                </Button>
            </FormControl>
        </Box>
    );
}

export default CreateJoke;