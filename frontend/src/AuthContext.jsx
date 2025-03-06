import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("https://cipherkey.onrender.com/auth-check", { withCredentials: true });
                setUser(response.data.authenticated ? response.data.user : null);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            console.log("Login Request:", { username, password });
    
            const response = await axios.post(
                "https://cipherkey.onrender.com/login",
                { username, password },
                { withCredentials: true }
            );
    
            toast.success("Logged In Successfully😊");
            setUser(response.data.user);  // Set user after login
            navigate("/");  // Redirect to homepage
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
        }
    };

    const signup = async (firstname, lastname, username, password) => {
        try {
            console.log("Signup Data:", { firstname, lastname, username, password });
    
            const response = await axios.post('https://cipherkey.onrender.com/signup', 
                { firstname, lastname, username, password }, 
                { withCredentials: true }
            );
    
            toast.success("Welcome to CipherKey😊");
            console.log("Signup Response:", response.data);
            setUser(response.data.user);  // Set user after signup
            navigate("/");  // Redirect to homepage after signup
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://cipherkey.onrender.com/logout', {}, { withCredentials: true });
            toast.success("Logged Out Successfully😢");
            setUser(null);
            navigate("/signup");  // Redirect to signup page after logout
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}  
        </AuthContext.Provider>
    );
};
