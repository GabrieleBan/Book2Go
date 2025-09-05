import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useAuth} from "@/components/auth-provider.jsx";
import {LoginComponent} from "@/components/login-component.jsx";




export default function AppHeader({ avatarSrc }) {
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const { user, login, logout } = useAuth();

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAvatarClick = () => {
        if (user) {
            navigate("/profile-page");
        }
    };

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <header
                ref={headerRef}
                className="w-full fixed top-0 shadow bg-amber-100 z-50"
            >
                {/* Top header */}
                <div className="flex items-center justify-center flex-1">
                    <Link to="/">
                        <img
                            src="/src/assets/icon-only.png"
                            alt="Logo"
                            className="h-8 w-8 mr-2"
                        />
                    </Link>

                    <Input
                        placeholder="Cerca tra milioni di libri"
                        className="w-[45vw] rounded-lg"
                    />

                    {/* Avatar */}
                    <img
                        onClick={handleAvatarClick}
                        src={user?.avatar || avatarSrc}
                        alt="User"
                        className="h-10 w-10 rounded-full left ml-4 cursor-pointer"
                    />

                    <div className="absolute right-0">
                        {/* Login / Logout Button */}
                        {user ? (
                            <Button onClick={handleLogout} className="ml-4">
                                Logout
                            </Button>
                        ) : (
                            <Button onClick={handleLogin} className="ml-4">
                                Login
                            </Button>
                        )}
                    </div>

                </div>

                {/* Navigation bar */}
                <nav className="flex flex-wrap justify-around sm:justify-between px-4 bg-purple-50 py-1 shadow-inner">
                    <button className="btn-ghost min-w-0">Trovaci</button>
                    <Link to="/catalog">
                        <button className="btn-ghost min-w-0">Libri</button>
                    </Link>
                    <Link to="/categories">
                        <button className="btn-ghost min-w-0">Categorie</button>
                    </Link>

                    <button className="btn-ghost min-w-0">Eventi</button>
                    <button className="btn-ghost min-w-0">Notifiche</button>
                </nav>
            </header>

            {/* Spacer */}
            <div style={{ height: headerHeight/2 }} className="pointer-events-none" />

            {/* Login modal */}
            {showLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
                    <div  className="bg-white p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <LoginComponent show={showLogin} />
                    </div>
                </div>
            )}
        </>
    );
}