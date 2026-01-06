import { useNavigate } from "react-router-dom";
import { Context } from "@/components/context-provider.jsx";

export default function StaffLendingActionsPage() {
    const navigate = useNavigate();
    const {user} = Context(); // prendo l'utente dal context
    const isAdmin = user?.roles?.includes("ADMIN"); // controlla se è admin

    const options = [
        {
            id: 1,
            name: "Gestione Prestiti",
            descr: "Ricevi o consegna un prestito ad un utente",
            path: "/lends",
            disabled: false,
        },
        {
            id: 2,
            name: "Gestione Libri Prestabili",
            descr: "Gestisci i libri prestabili presso questa libreria",
            path: "/lendable-books",
            disabled: !isAdmin, // disabilita se non admin
        },
    ];

    return (
        <div className="min-h-screen w-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Scegli un'opzione</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((opt) => (
                    <div
                        key={opt.id}
                        className={`p-6 bg-white rounded shadow cursor-pointer hover:bg-blue-50 transition ${
                            opt.disabled ? "opacity-50 cursor-not-allowed hover:bg-white" : ""
                        }`}
                        onClick={() => {
                            if (!opt.disabled) navigate(opt.path);
                        }}
                    >
                        <h2 className="text-xl font-semibold">{opt.name}</h2>
                        <p className="text-gray-500 mt-2">{opt.descr}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}