import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
