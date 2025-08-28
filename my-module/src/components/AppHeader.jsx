import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function AppHeader({ logoSrc, avatarSrc }) {
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

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

    return (


        <>
            <header ref={headerRef} className="w-full fixed top-0 shadow bg-amber-100 z-50">
                {/* Top header */}


                <div className="flex items-center justify-center flex-1">
                    <img src={logoSrc} alt="Logo" className="h-8 w-8 mr-2" />
                    <Input
                        placeholder="Cerca tra milioni di libri"
                        className="w-[45vw] rounded-lg"
                    />
                    {/* Avatar on the right */}
                    <img
                        src={avatarSrc}
                        alt="User"
                        className="h-10 w-10 rounded-full left ml-4"
                    />
                </div>

                {/* Navigation bar */}
                <nav className="flex flex-wrap justify-around sm:justify-between px-4 bg-purple-50 py-1 shadow-inner">
                    <button className="btn-ghost min-w-0">Trovaci</button>
                    <button className="btn-ghost min-w-0">Libri</button>
                    <button className="btn-ghost min-w-0">Categorie</button>
                    <button className="btn-ghost min-w-0">Eventi</button>
                    <button className="btn-ghost min-w-0">Notifiche</button>
                </nav>
            </header>

            {/* Spacer dynamically sized */}
            <div style={{ height: headerHeight }} className="pointer-events-none" />
        </>
    );
}