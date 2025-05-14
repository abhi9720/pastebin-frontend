// GoogleCallbackPage.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("authToken", token);
            // Optionally, fetch user info using token
            navigate("/pastes"); // Or wherever
        } else {
            // Error fallback
            navigate("/");
        }
    }, [location, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Processing login...</p>
        </div>
    );
};

export default GoogleCallbackPage;
