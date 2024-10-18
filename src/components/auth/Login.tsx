import { Box, TextField, FormControl, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <form method="POST" action="http://localhost:5000/api/auth/login">
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
                        required
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <Button variant="contained" startIcon={<LoginIcon />}>
                        Login
                    </Button>
                </FormControl>
            </form>
        </Box>
    );
}

export default Login;