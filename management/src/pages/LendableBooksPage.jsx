import { useState } from "react";
import {Context} from "@/components/context-provider.jsx";
import {API} from "@/utils/api.js";
export default function LendableBooksPage() {
    const { getTokens } = Context(); // Ottieni il token dal contesto
    const [uuid, setUuid] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [lendableOptions, setLendableOptions] = useState(null);
    const [durationDays, setDurationDays] = useState(30);
    const [maxRenewals, setMaxRenewals] = useState(0);
    const [minRequiredTier, setMinRequiredTier] = useState("UNSUBSCRIBED");

    const checkIfLendable = async () => {
        if (!uuid) {
            setResponseMessage("UUID non valido. Inserisci l'UUID del libro.");
            return;
        }

        setLoading(true);
        setResponseMessage("");
        setLendableOptions(null); // Resettiamo le opzioni precedenti

        const token = getTokens()?.accessToken;
        if (!token) {
            setResponseMessage("Errore: Token di autenticazione mancante.");
            return;
        }

        const apiUrl = `${API.LEND}/lendable-formats/${uuid}/options`;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setResponseMessage(errorData.message || "Errore sconosciuto durante la richiesta.");
                return;
            }

            const options = await response.json();

            // Se ci sono opzioni, mostra le opzioni
            if (options.length > 0) {
                setLendableOptions(options);
                setResponseMessage(""); // Reset messaggio di errore
            } else {
                // Se non ci sono opzioni, mostriamo comunque che il libro è prestabile e permettiamo l'aggiunta delle opzioni
                setResponseMessage("Il libro è prestabile, ma non ha opzioni disponibili.");
                setLendableOptions([]); // Settiamo un array vuoto per indicare che il libro è lendable ma senza opzioni
            }
        } catch (error) {
            console.error("Errore durante la richiesta", error);
            setResponseMessage("Errore durante la richiesta: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Funzione per aggiungere le opzioni di prestito
    const addLendableOptions = async () => {
        if (!uuid) {
            setResponseMessage("UUID non valido. Inserisci l'UUID del libro.");
            return;
        }

        setLoading(true);
        setResponseMessage("");

        const token = getTokens()?.accessToken;
        if (!token) {
            setResponseMessage("Errore: Token di autenticazione mancante.");
            return;
        }

        const apiUrl = `${API.LEND}/lendable-formats/${uuid}/options`;

        const payload = {
            description: "", // Puoi aggiungere una descrizione personalizzata se lo desideri
            durationDays: durationDays,
            maxRenewals: maxRenewals,
            minRequiredTier: minRequiredTier,
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setResponseMessage(errorData.message || "Errore sconosciuto durante la richiesta.");
                return;
            }

            setResponseMessage("Opzioni di prestito aggiunte con successo!");

            // Dopo aver aggiunto le opzioni, ricarica le opzioni disponibili
            checkIfLendable(); // Ricarica le opzioni
        } catch (error) {
            console.error("Errore durante la richiesta", error);
            setResponseMessage("Errore durante la richiesta: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Gestione Libri Prestabili</h1>
            <p>Qui puoi gestire i libri prestabili e le loro opzioni. Inserisci l'UUID del libro per iniziare.</p>

            <div className="mt-6 space-y-4">
                <input
                    type="text"
                    placeholder="Inserisci UUID del libro"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    className="w-full p-2 bg-white border rounded-md"
                />

                <button
                    onClick={checkIfLendable}
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Verificando..." : "Cerca libro prestabile"}
                </button>

                {responseMessage && (
                    <div className="mt-4 text-center text-gray-700">
                        <p>{responseMessage}</p>
                    </div>
                )}

                {/* Se il libro è prestabile, mostra le opzioni */}
                {lendableOptions && lendableOptions.length === 0 && (
                    <div className="mt-6 space-y-2">
                        <h2 className="font-semibold">Il libro è prestabile, ma non ha opzioni disponibili.</h2>
                    </div>
                )}

                {/* Mostra le opzioni se esistono */}
                {lendableOptions && lendableOptions.length > 0 && (
                    <div className="mt-6 space-y-2">
                        <h2 className="font-semibold">Opzioni Disponibili:</h2>
                        <ul className="list-disc pl-6">
                            {lendableOptions.map((option) => (
                                <li key={option.id}>
                                    Durata: {option.durationDays} giorni, Max rinnovi: {option.maxRenewals}, Abbonamento richiesto: {option.minRequiredTier}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Se non ci sono opzioni, permetti l'aggiunta */}
                {lendableOptions !== null && (
                    <div className="mt-6 space-y-4">
                        <h3 className="font-semibold">Aggiungi Opzioni di Prestito</h3>
                        <div className="flex space-x-4">
                            <div className="w-1/3">
                                <label className="block">Durata (Giorni)</label>
                                <input
                                    type="number"
                                    value={durationDays}
                                    onChange={(e) => setDurationDays(parseInt(e.target.value))}
                                    className="w-full p-2 border bg-white rounded-md"
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block">Max Rinnovi</label>
                                <input
                                    type="number"
                                    value={maxRenewals}
                                    onChange={(e) => setMaxRenewals(parseInt(e.target.value))}
                                    className="w-full p-2 border bg-white rounded-md"
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block">Tier Minimo</label>
                                <select
                                    value={minRequiredTier}
                                    onChange={(e) => setMinRequiredTier(e.target.value)}
                                    className="w-full p-2 bg-white border rounded-md"
                                >
                                    <option value="UNSUBSCRIBED">UNSUBSCRIBED</option>
                                    <option value="SUB_TIER1">SUB_TIER1</option>
                                    <option value="SUB_TIER2">SUB_TIER2</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={addLendableOptions}
                            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4"
                            disabled={loading}
                        >
                            {loading ? "Aggiornando..." : "Aggiungi Opzione di Prestito"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}