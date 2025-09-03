import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // user is an object containing multiple fields
    const [user, setUser] = useState(null);
    const [lastBook, setLastBook] = useState(null);

    // Persist login and lastBook across refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));

        const savedBook = localStorage.getItem("lastBook");
        if (savedBook) setLastBook(JSON.parse(savedBook));
    }, []);

    // login accepts a full user object
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // logout clears the user and lastBook
    const logout = () => {
        setUser(null);
        setLastBook(null);
        localStorage.removeItem("user");
        localStorage.removeItem("lastBook");
    };

    // updateUser allows updating fields individually
    const updateUser = (updates) => {
        setUser((prevUser) => {
            const newUser = { ...prevUser, ...updates };
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
    };

    // setLastBook updates the last viewed book
    const rememberBook = (book) => {
        setLastBook(book);
        localStorage.setItem("lastBook", JSON.stringify(book));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, lastBook, rememberBook }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for child components
export const useAuth = () => useContext(AuthContext);