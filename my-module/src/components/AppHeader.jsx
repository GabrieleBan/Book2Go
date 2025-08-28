import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppHeader({ logoSrc = "/logo.png", avatarSrc = "/user-avatar.png" }) {
    return (
        <header className="w-full">
            {/* Top header: logo + search + avatar */}
            <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sticky top-0 z-50">
                {/* Logo + input centered */}
                <div className="flex items-center justify-center flex-1">
                    <img src={logoSrc} alt="Logo" className="h-8 w-8 mr-2" />
                    <Input
                        placeholder="Cerca tra milioni di libri"
                        className="w-[55vw] rounded-lg"
                    />
                    {/* Avatar on the right */}
                    <img
                        src={avatarSrc}
                        alt="User"
                        className="h-10 w-10 rounded-full left ml-4"
                    />
                </div>


            </div>

            {/* Navigation bar */}
            <nav className="flex justify-around bg-purple-50 py-2 shadow-inner sticky top-[64px] z-40">
                <Button variant="ghost">Trovaci</Button>
                <Button variant="ghost">Libri</Button>
                <Button variant="ghost">Categorie</Button>
                <Button variant="ghost">Eventi</Button>
                <Button variant="ghost">Notifiche</Button>
            </nav>
        </header>
    );
}

