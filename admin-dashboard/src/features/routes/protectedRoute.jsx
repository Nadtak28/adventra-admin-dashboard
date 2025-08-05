import { useState, useEffect } from 'react';
import { tokenStore } from "../../utils/dataStore.js";
import Login from "../../pages/login.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

    useEffect(() => {
        const token = tokenStore.getToken();
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}