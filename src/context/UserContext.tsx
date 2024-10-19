import { useState, useEffect, ReactNode, createContext, FC } from 'react';
import axios from 'axios';

// Define the shape of the user data
interface User {
    _id: string; // or mongoose.Types.ObjectId if using Mongoose
    name: string;
    email: string;
    role: string; // Add any other properties you have
    createdAt: string; // This can be Date type if you handle it as a Date object
    updatedAt: string; // This can be Date type if you handle it as a Date object
    __v: number; // Version key, typically not used in logic but can be included
}

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

    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/verifyToken', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
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

    // Signup function
    const signup = async (name: string, email: string, password: string) => {
        try {
            console.log(name, email, password)
            const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            console.log(response.data);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    // Login function
    const login = async (email: string, password: string) => {
        try {
            console.log(email, password)
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

    // The provider must return valid JSX
    return (
        <UserContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Export both UserContext and UserContextProvider
export { UserContext, UserContextProvider };
