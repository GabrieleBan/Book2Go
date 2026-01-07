import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import {Context} from "@/components/context-provider.jsx";
import RentalFormat from "@/classes/LendableFormats.js";
import Subscriptions from "@/classes/Subscriptions.js";
import {API} from "@/utils/api.js";

export default function LendComponent({ formatId, formatType, onClose }) {
    const [libraries, setLibraries] = useState([]);
    const [selectedLibrary, setSelectedLibrary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { getTokens } = Context();
    const { user }=Context();
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // Mock fetch delle librerie
    useEffect(() => {
        const fetchLibraries = async () => {
            const data = [
                {
                    id: "00000000-0000-0000-0000-000000000001",
                    name: "Biblioteca Centrale",
                    address: "Via Roma 12, Milano"
                },
                {
                    id: "00000000-0000-0000-0000-000000000002",
                    name: "Biblioteca Est",
                    address: "Via Torino 45, Milano"
                }
            ];
            setLibraries(data);
            setSelectedLibrary(data[0].id);
        };

        fetchLibraries();
    }, []);

    const handleConfirm = async () => {
        if (!selectedLibrary) return;
        const token = getTokens()?.accessToken;
        const url = `${API.RENTAL}/lendings`;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    lendableBookId: formatId,
                    libraryId: selectedLibrary
                })
            });

            if (res.status === 401) {
                setError("Utente non autorizzato. Effettua il login.");
                setLoading(false);
                return;
            }

            if (!res.ok) {
                let errorMessage = `Errore: ${res.status}`;
                try {
                    const data = await res.json(); // prova a parsare il JSON
                    if (data?.message) errorMessage = `Errore: ${data.message}`;
                } catch (e) {
                    setError("Qualcosa non è andato come doveva. Riprova più tardi o contatta l'assistenza.")
                }
                setError(errorMessage);
                setLoading(false);
                return;
            }

            setSuccess(true);
        } catch (err) {
            setError(`Errore di rete: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchOptions = async () => {
            const token = getTokens()?.accessToken;
            if (!formatId || !token) return;

            const opts = await RentalFormat.fetchOptionsByFormatId(formatId, token);

            setOptions(opts);

            // seleziona automaticamente la migliore opzione disponibile per l’utente
            const bestOption = Subscriptions.getBestOptionForUser(user.subscription, opts);

            setSelectedOption(bestOption);
        };

        fetchOptions();
    }, [formatId]);

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    Prestito formato
                </h2>

                <p className="text-gray-700 mb-2">Formato selezionato:</p>
                <div className="p-3 bg-gray-100 rounded-md text-center mb-4">
                    <div className="font-medium">{formatType}</div>
                    <div className="font-mono text-sm text-gray-600 mt-1">{formatId}</div>
                </div>
                {selectedOption && (
                    <p className="text-gray-600 mb-2">
                        Durata prestito: {selectedOption.durationDays} giorni · Rinnovi max: {selectedOption.maxRenewals}
                    </p>
                )}
                {options.length === 0 && (
                    <p className="text-red-500 mt-4">Il libro non ha opzioni di prestito disponibili.</p>
                )}
                {formatType !== "AUDIOBOOK" && formatType !== "EBOOK" && (
                    <>
                        <h3 className="text-lg font-medium mb-2">Seleziona libreria:</h3>
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-4">
                            {libraries.map((lib) => (
                                <label
                                    key={lib.id}
                                    className={`flex justify-between items-center border p-2 rounded-md cursor-pointer
                        ${selectedLibrary === lib.id ? "bg-black text-white" : "bg-white text-gray-800"}
                        hover:bg-gray-100 transition-colors`}
                                >
                                    <div>
                                        <div className="font-medium">{lib.name}</div>
                                        <div className="text-sm text-gray-600">{lib.address}</div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="library"
                                        value={lib.id}
                                        checked={selectedLibrary === lib.id}
                                        onChange={() => setSelectedLibrary(lib.id)}
                                        className="accent-black"
                                    />
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-600 mb-2">Prestito confermato con successo!</p>}

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleConfirm}
                        disabled={loading || success}
                        className={`px-4 py-2 rounded-lg text-white transition 
                            ${loading || success ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
                    >
                        {loading ? "Caricamento..." : "Conferma"}
                    </button>
                </div>
            </div>
        </div>
    );
}