import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Context} from "@/components/context-provider.jsx";
import { API } from "@/utils/api.js";
import Staff from "@/classes/Staff.js";


export default function StaffLoggingPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { saveTokens, login, selectedLibrary, setSelectedLibrary } = Context();
    const libraries = [
        {
            id: "00000000-0000-0000-0000-000000000001",
            name: "Biblioteca Centrale",
            address: "Via Roma 12, Milano",
        },
        {
            id: "00000000-0000-0000-0000-000000000002",
            name: "Biblioteca Est",
            address: "Via Torino 45, Milano",
        },
    ];

    const [showLibrarySelector, setShowLibrarySelector] = useState(false);
    const navigate = useNavigate();
    function decodeJWT(token) {
        try {
            const payload = token.split(".")[1];
            const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
            return decoded;
        } catch {
            return null;
        }
    }

    const handleLogin = async () => {
        setError("");
        try {
            const response = await fetch(`${API.AUTH}/auth/login`, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                setError("Credenziali errate");
                return;
            }

            const tokenData = await response.json();
            const payload = decodeJWT(tokenData.accessToken);
            const roles = payload?.roles || [];
            if (!roles.includes("ADMIN") && !roles.includes("EMPLOYEE")) {
                setError("Accesso negato: account non autorizzato");
                return;
            }


            saveTokens({
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
            });

            const user = Staff.fromToken(tokenData.accessToken)
            console.log("logged ",user)
            if (user) login(user);


            navigate("/dashboard");
        } catch (err) {
            setError("Errore durante il login");
            console.error(err);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Staff Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-3 p-2 border rounded bg-white"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 p-2 border rounded bg-white"
                />

                {error && <p className="text-red-600 mb-3">{error}</p>}

                <button
                    onClick={handleLogin}
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
            <div className="absolute bottom-4 bg-white shadow-md rounded p-3 cursor-pointer">
                <div onClick={() => setShowLibrarySelector(!showLibrarySelector)}>
                    {libraries.find((lib) => lib.id === selectedLibrary)?.name || "Seleziona libreria"}
                </div>

                {showLibrarySelector && (
                    <div className="mt-2 bg-gray-50 border rounded p-2 flex flex-col space-y-1">
                        {libraries.map((lib) => (
                            <button
                                key={lib.id}
                                onClick={() => {
                                    setSelectedLibrary(lib.id);   // <--- usa context
                                    setShowLibrarySelector(false);
                                }}
                                className={`text-left bg-white p-1 rounded ${
                                    selectedLibrary === lib.id ? "font-bold" : ""
                                }`}
                            >
                                {lib.name} - {lib.address}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}