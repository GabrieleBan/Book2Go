import { useState } from "react";
import { API } from "@/utils/api.js";

export default function UserSearch({ onSelectReader }) {
    const [searchParams, setSearchParams] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
    });
    const [readers, setReaders] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateParam = (key, value) => {
        setSearchParams((prev) => ({ ...prev, [key]: value }));
    };

    const searchReaders = async () => {
        setError("");
        setLoading(true);
        setReaders([]);

        try {
            const params = new URLSearchParams();
            Object.entries(searchParams).forEach(([key, value]) => {
                if (value?.trim()) params.append(key, value.trim());
            });

            const response = await fetch(`${API.READER}/readers/?${params.toString()}`);

            if (!response.ok) {
                setError("Errore nella ricerca lettori");
                return;
            }

            const data = await response.json();
            setReaders(data);
        } catch (err) {
            console.error(err);
            setError("Errore di comunicazione con il servizio reader");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded p-4 mb-4">
            <h2 className="font-semibold mb-2">Ricerca Lettore</h2>

            <div className="grid grid-cols-2 gap-2 mb-3">
                <input placeholder="Username" onChange={(e) => updateParam("username", e.target.value)} className="p-2 border bg-white rounded" />
                <input placeholder="Nome" onChange={(e) => updateParam("name", e.target.value)} className="p-2 border bg-white rounded" />
                <input placeholder="Cognome" onChange={(e) => updateParam("surname", e.target.value)} className="p-2 border bg-white rounded" />
                <input placeholder="Email" onChange={(e) => updateParam("email", e.target.value)} className="p-2 border bg-white rounded" />
                <input placeholder="Telefono" onChange={(e) => updateParam("phone", e.target.value)} className="p-2 border bg-white rounded" />
            </div>

            <button onClick={searchReaders} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">
                Cerca
            </button>

            {loading && <p>Ricerca in corso...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {readers.length > 0 && (
                <ul className="space-y-2">
                    {readers.map((reader) => (
                        <li
                            key={reader.id}
                            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                            onClick={() => onSelectReader(reader)}
                        >
                            <strong>{reader.username}</strong>
                            {reader.name && ` - ${reader.name}`}
                            {reader.surname && ` ${reader.surname}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}