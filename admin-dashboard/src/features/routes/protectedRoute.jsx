import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { tokenStore } from "../../utils/dataStore.js";

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

    useEffect(() => {
        const token = tokenStore.getToken();
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className=" flex size-full w-full min-h-screen flex-col justify-center items-center bg-[#0b1520] group/design-root overflow-x-hidden font-sans">
            loading...
            </div>
            )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}