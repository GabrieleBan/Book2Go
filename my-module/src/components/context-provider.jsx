import { createContext, useContext, useState, useEffect } from "react";
import BookSummary from "@/classes/BookSummary.js";
import {API} from "@/utils/api.js";

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
        (saved) => BookSummary.fromJSON(JSON.parse(saved)) // restore Book instance
    );

    const login = (userData) => setUser(userData);
    const logout = async () => {
        const refreshTkn=tokens.refreshToken
        const response = await fetch(`${API.AUTH}/auth//logout`, {
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

    useEffect(() => {
        if (user && tokens?.refreshToken) {
            const intervalId = setInterval(() => {
                refreshAuthenticationToken();
            }, 120000); // Ogni 2 minuti

            return () => clearInterval(intervalId);  // Pulizia dell'intervallo quando il componente si smonta
        }
    }, [user, tokens]);
    const refreshAuthenticationToken = async () => {
        if (!tokens?.refreshToken) return;

        const response = await fetch(`${API.AUTH}/auth/refresh`, {
            method: "POST",
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const tok = await response.json();
            setTokens({ accessToken: tok.accessToken, refreshToken: tok.refreshToken });
        } else {
            console.log("Token refresh failed. Logging out...");
            logout();  // Fai il logout se il refresh non ha successo
        }
    };

    const updateUser = (updates) => setUser((prev) => ({ ...prev, ...updates }));

    const rememberBook = (book) => {
        const b = book instanceof BookSummary ? book : new BookSummary(book);
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