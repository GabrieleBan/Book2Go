import { useNavigate } from "react-router-dom";
import {Context} from  "@/components/context-provider.jsx";

export default function DashboardPage() {
    const { user } = Context();
    const navigate = useNavigate();

    const actions = [
        { id: 1, name: "Inventario", path: "/inventory" },
        { id: 2, name: "Prestiti", path: "/lends" },
        { id: 3, name: "Acquisti", path: "/purchases" },

    ];

    return (
        <div className="min-h-screen w-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Benvenuto, {user.username}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <div
                        key={action.id}
                        className="p-6 bg-white rounded shadow cursor-pointer hover:bg-blue-50"
                        onClick={() => navigate(action.path)}
                    >
                        <h2 className="text-xl font-semibold">{action.name}</h2>
                        <p className="text-gray-500 mt-2">Clicca per gestire {action.name.toLowerCase()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}