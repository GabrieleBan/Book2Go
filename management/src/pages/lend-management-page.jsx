import { useState, useEffect } from "react";
import UserSearch from "@/components/UserSearch.jsx";
import { API } from "@/utils/api.js";
import { Context } from "@/components/context-provider.jsx";

export default function LendPage() {
    const { tokens, selectedLibrary } = Context();
    const [selectedReader, setSelectedReader] = useState(null);
    const [lendings, setLendings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deliverErrors, setDeliverErrors] = useState({}); // per messaggi separati per lending


    // Carica i prestiti AWAITING per il reader selezionato
    const fetchLendings = async (readerId) => {
        setLoading(true);
        setLendings([]);
        setDeliverErrors({});
        try {
            const params = new URLSearchParams();
            params.append("readerId", readerId);
            params.append("states", "AWAITING");

            const response = await fetch(
                `${API.LEND}/lendings/readers/${readerId}/lendings?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokens?.accessToken}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Errore nel caricamento dei prestiti");

            const data = await response.json();
            const filtered = data.filter(lending => lending.libraryId === selectedLibrary);
            console.log(selectedLibrary)
            setLendings(filtered);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const [deliverMessages, setDeliverMessages] = useState({}); // messaggi di successo per prestiti

    const handleDeliver = async (lending) => {
        setDeliverErrors((prev) => ({ ...prev, [lending.id]: "" }));
        setDeliverMessages((prev) => ({ ...prev, [lending.id]: "" }));
        try {
            const response = await fetch(
                `${API.LEND}/lendings/${lending.id}/assignment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokens?.accessToken}`,
                    },
                    body: JSON.stringify({
                        userId: lending.userId,
                        copyNumber: lending.copy.copyNumber,
                        libraryId: lending.libraryId,
                    }),
                }
            );

            if (!response.ok) {
                let msg = "Errore durante la consegna";
                try {
                    const errData = await response.json();
                    msg = errData.message || JSON.stringify(errData);
                } catch {
                    const text = await response.text();
                    if (text) msg = text;
                }
                setDeliverErrors((prev) => ({ ...prev, [lending.id]: msg }));
                return;
            }

            // Conferma consegna
            setDeliverMessages((prev) => ({ ...prev, [lending.id]: "Consegna avvenuta con successo!" }));

            // Aggiorna lista prestiti dopo consegna
            fetchLendings(selectedReader.id);
        } catch (err) {
            console.error(err);
            setDeliverErrors((prev) => ({ ...prev, [lending.id]: "Errore di comunicazione" }));
        }
    };

    useEffect(() => {
        if (selectedReader) fetchLendings(selectedReader.id);
    }, [selectedReader]);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white h-screen w-screen">
            <h1 className="text-2xl font-bold mb-4">Gestione Prestiti</h1>

            {!selectedReader && <UserSearch onSelectReader={setSelectedReader} />}

            {selectedReader && (
                <div className="border rounded p-4 bg-green-50 mb-4">
                    <h2 className="font-semibold mb-2">Lettore selezionato</h2>
                    <p><strong>Username:</strong> {selectedReader.username}</p>
                    <p><strong>ID:</strong> {selectedReader.id}</p>
                    <button
                        className="mt-3 px-3 py-1 text-sm bg-gray-200 rounded"
                        onClick={() => setSelectedReader(null)}
                    >
                        Cambia lettore
                    </button>
                </div>
            )}

            {loading && <p>Caricamento prestiti...</p>}
            {!loading && selectedReader && lendings.length === 0 && (
                <p className="text-gray-600 mt-2">
                    Nessun prestito in attesa per la libreria selezionata.
                </p>
            )}
            {lendings.length > 0 && (
                <div className="space-y-3">
                    {lendings.map((lending) => (
                        <div key={lending.id} className="border p-3 rounded">
                            <p><strong>Lending ID:</strong> {lending.id}</p>
                            <p><strong>Libro ID:</strong> {lending.copy.lendableBookId}</p>
                            <p><strong>Copy Number:</strong> {lending.copy.copyNumber}</p>
                            <p><strong>Stato:</strong> {lending.state}</p>
                            <button
                                className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                                onClick={() => handleDeliver(lending)}
                            >
                                Consegna
                            </button>
                            {deliverErrors[lending.id] && (
                                <p className="text-red-600 mt-1">{deliverErrors[lending.id]}</p>
                            )}
                            {deliverMessages[lending.id] && (
                                <p className="text-green-600 mt-1">{deliverMessages[lending.id]}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}