import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Context} from "@/components/context-provider.jsx";
import {LoginComponent} from "@/components/login-component.jsx";
import {SearchBar} from "@/components/search-bar.jsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.js";



export default function AppHeader({ avatarSrc }) {
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const { user, login, logout } = Context();
    const [showLogout, setShowLogOut]=useState(false);

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
        setShowLogOut(true)
    };


    function afterLogOut() {
        setShowLogOut(false);
        navigate("/");
    }

    return (
        <>
            <header
                ref={headerRef}
                className="w-full fixed top-0 shadow  bg-[#F5E7D2] z-50"
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

                    <SearchBar></SearchBar>

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
                <nav className="flex  justify-around sm:justify-between px-4 bg-[#ECE6F0] py-1 shadow-inner">
                    <button className="btn-ghost bg-[#ECE6F0] min-w-0">Trovaci</button>
                    <Link to="/catalog">
                        <button className="btn-ghost bg-[#ECE6F0] min-w-0">Libri</button>
                    </Link>
                    <Link to="/categories">
                        <button className="btn-ghost bg-[#ECE6F0] min-w-0">Categorie</button>
                    </Link>

                    <button  className="btn-ghost  bg-[#ECE6F0] min-w-0">Eventi</button>
                    <button className="btn-ghost bg-[#ECE6F0] min-w-0">Notifiche</button>
                </nav>
            </header>

            {/* Spacer */}
            <div style={{ height: headerHeight/2 }} className="pointer-events-none" />

            {/* Login modal */}
            {showLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
                    <div  className="bg-white p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <LoginComponent setShowLogin={setShowLogin}  />
                    </div>
                </div>
            )}
            {showLogout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Card className="w-96 p-6 text-center relative">
                        {/* Chiudi con X in alto a destra */}
                        <button
                            onClick={() => afterLogOut()}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
                        >
                            ×
                        </button>

                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-green-600">Logged Out</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-gray-700">
                                Alla prossima
                            </p>
                        </CardContent>

                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full bg-green-100 text-green-800 hover:bg-green-200"
                                onClick={() => afterLogOut()}
                            >
                                Chiudi
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}