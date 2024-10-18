import { useState, useEffect, ReactNode, createContext, FC } from 'react';
import axios from 'axios';

// Define the shape of the user data
interface User {
    id: string;
    name: string;
    email: string;
    // Add other fields as needed
};

// Define the context value type
interface UserContextType {
    user: User | null;
    signup: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// Define the props for the provider component
interface UserContextProviderProps {
    children: ReactNode;
};

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the UserContextProvider component
const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Signup function
    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    // Login function
    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/verifyToken', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
            } catch (error) {
                console.error('Token verification failed', error);
                logout();
            }
        }
    };

    // Check if the user is already logged in when the app loads
    useEffect(() => {
        verifyToken();
    }, []);

    // The provider must return valid JSX
    return (
        <UserContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Export both UserContext and UserContextProvider
export { UserContext, UserContextProvider };
