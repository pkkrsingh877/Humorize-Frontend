import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Signup = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
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
                    required
                />
                <TextField
                    id="outlined"
                    label="Email"
                    type="email"
                    required
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    required
                />
                <Button variant="contained" startIcon={<AppRegistrationIcon />}>
                    Signup
                </Button>
            </FormControl>
        </Box>
    );
}

export default Signup;