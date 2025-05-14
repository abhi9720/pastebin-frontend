import React, { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Added name state
    const [isSignup, setIsSignup] = useState(false); // Track if it's a signup form


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/pastes');
        }
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google/login`;
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isSignup ? `${process.env.REACT_APP_BACKEND_URL}/auth/signup` : `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
        const action = isSignup ? "Signup" : "Login";

        // Handle email/password login/signup logic
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name: isSignup ? name : undefined }), // Only send name during signup
            });

            if (!response.ok) throw new Error(`${action} failed`);
            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            navigate("/pastes");
        } catch (error) {
            toast.error(`${action} failed. Please check your credentials.`);
        }
    };

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center px-4"
            style={{
                backgroundImage: `url(${process.env.REACT_APP_BG_URL})`,
            }}
        >
            <div className="w-full max-w-sm p-6 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
                <div className="flex justify-center mb-4">
                    <LogIn className="w-12 h-12 text-blue-500 dark:text-gray-300" />
                </div>
                <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    Welcome to Pastebin
                </h2>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    {isSignup && (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    )}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    >
                        {isSignup ? "Sign up" : "Sign in"} with Email
                    </button>
                </form>

                <div className="my-4 text-center text-sm text-gray-500 dark:text-gray-400">or</div>

                <button
                    onClick={handleLogin}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                    Sign in with Google
                </button>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                    </span>
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="ml-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                        {isSignup ? "Log in" : "Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleLoginPage;
