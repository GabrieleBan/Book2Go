import { createContext, useContext, useState, useEffect } from "react";
import Book from "@/classes/Book.js";

// helper for localStorage sync
const usePersistentState = (key, defaultValue, parser = JSON.parse) => {
    const [state, setState] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? parser(saved) : defaultValue;
        } catch (e) {
            console.warn(`Failed to parse ${key} from localStorage:`, e);
            return defaultValue;
        }
    });

    const setPersistentState = (value) => {
        setState(value);
        if (value === null) localStorage.removeItem(key);
        else localStorage.setItem(key, JSON.stringify(value));
    };

    return [state, setPersistentState];
};

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = usePersistentState("user", null);
    const [tokens, setTokens] = usePersistentState("tokens", null);
    const [lastBook, setLastBook] = usePersistentState(
        "lastBook",
        null,
        (saved) => Book.fromJSON(JSON.parse(saved)) // restore Book instance
    );

    const login = (userData) => setUser(userData);
    const logout = async () => {
        const refreshTkn=tokens.refreshToken
        const response = await fetch("http://localhost:8090/auth/logout", {
            method: "POST",
            body: JSON.stringify({
                refreshToken: refreshTkn,
            }),
            headers: {"Content-Type": "application/json"}
        })
        if(!response.ok){console.log(response.body)}
        setUser(null);
        setTokens(null);
        setLastBook(null);
    };

    const refreshAuthenticationToken= async ()=>{
        if(!tokens?.refreshToken) return;
        const refreshTkn=tokens.refreshToken;
        const response= await fetch("http://localhost:8090/auth/refresh", {
                method: "POST",
                body: JSON.stringify({
                    refreshToken: refreshTkn,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if(response.ok){
            const tok=await response.json();
            try {
                saveTokens({accessToken: tok.accessToken, refreshToken: tok.refreshToken})
            }
            catch (e){
                console.log(e)
            }
        }
        else {
            console.log("Must log again")
        }

    }

    const updateUser = (updates) => setUser((prev) => ({ ...prev, ...updates }));

    const rememberBook = (book) => {
        const b = book instanceof Book ? book : new Book(book);
        setLastBook(b); // saved in localStorage automatically
    };

    const saveTokens = ({ accessToken, refreshToken }) => setTokens({ accessToken, refreshToken });
    const getTokens = () => tokens;

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                lastBook,
                rememberBook,
                tokens,
                saveTokens,
                getTokens,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const Context = () => {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error("Context must be used within a ContextProvider");
    }
    return ctx;
};