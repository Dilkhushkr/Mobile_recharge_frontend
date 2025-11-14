import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";



interface ProtectedRouteProps {
    element : React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const token = localStorage.getItem('token');
    console.log("ProtectedRoute token:", token);

    if(!token){
        return <Navigate to="/" replace />;
    }

    return element;

}

export default ProtectedRoute;