import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // user is an object containing multiple fields
    const [user, setUser] = useState(null);

    // Persist login across refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // login accepts a full user object
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // logout clears the user
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // updateUser allows updating fields individually
    const updateUser = (updates) => {
        setUser((prevUser) => {
            const newUser = { ...prevUser, ...updates };
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for child components
export const useAuth = () => useContext(AuthContext);