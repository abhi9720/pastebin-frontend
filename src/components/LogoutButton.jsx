import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return (
        <button onClick={handleLogout} className="text-red-500 hover:text-red-600 flex items-center gap-1">
            <LogOut size={18} /> Logout
        </button>

    );
};

export default LogoutButton;
