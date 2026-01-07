import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "@/components/context-provider.jsx";
import { API } from "@/utils/api.js";




export default function InventoryManagePage() {
    const { formatId } = useParams();
    const { selectedLibrary, getTokens } = Context();

    const [bookId, setBookId] = useState(formatId || "");
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [quantityDelta, setQuantityDelta] = useState(0);

    const loadStocks = async () => {
        if (!bookId) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API.INVENTORY}/inventory/stocks/books/${bookId}`);

            if (!res.ok) {
                let errMsg = `Errore ${res.status}`;
                try {
                    // Proviamo a leggere il messaggio dal body JSON
                    const errData = await res.json();
                    errMsg = errData.message || errMsg;
                } catch (e) {

                    console.error(e)
                    errMsg = "Errore caricamento stock";
                }

                setStocks([]);
                setError(errMsg);
                return;
            }

            const data = await res.json();
            setStocks(data || []);
        } catch (e) {
            console.error(e);
            setError("Errore nel caricamento inventario: " + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (formatId) loadStocks();
    }, [formatId]);

    /* =========================
       UPDATE STOCK
       ========================= */
    const updateStock = async () => {
        if (!bookId || !quantityDelta) return;

        setLoading(true);
        setError("");

        try {
            const token=getTokens()?.accessToken;
            const res = await fetch(
                `${API.INVENTORY}/inventory/stocks/libraries/${selectedLibrary}/books/${bookId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,},
                    body: JSON.stringify({ quantity: quantityDelta }),
                }
            );

            if (!res.ok) {
                const err = await res.json();
                setError(err.message || "Errore aggiornamento stock");
                return;
            }

            setQuantityDelta(0); // reset input
            await loadStocks();
        } catch (e) {
            console.error(e);
            setError("Errore aggiornamento stock");
        } finally {
            setLoading(false);
        }
    };


    const currentLibraryStock = stocks.find(
        (s) => s.id.libraryId === selectedLibrary
    );

    const totalQuantity = stocks.reduce(
        (sum, s) => sum + (s.quantity || 0),
        0
    );

    const visibleStocks = showAll
        ? stocks
        : stocks.filter((s) => s.id.libraryId === selectedLibrary);

    return (
        <div className="min-h-screen w-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Gestione Inventario</h1>

            {/* Input UUID + cerca */}
            <div className="flex gap-2 mb-4">
                <input
                    className="flex-1 p-2 border rounded bg-white"
                    placeholder="Inserisci Book ID"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                />
                <button
                    onClick={loadStocks}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={loading}
                >
                    {loading ? "Caricamento..." : "Cerca"}
                </button>
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {/* RIASSUNTO */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <p><strong>Totale copie:</strong> {totalQuantity}</p>
                <p><strong>Questa libreria:</strong> {currentLibraryStock?.quantity ?? 0}</p>
            </div>

            {/* AZIONI: aggiungi/togli copie */}
            <div className="flex gap-2 mb-6">
                <input
                    type="number"
                    value={quantityDelta}
                    onChange={(e) => setQuantityDelta(Number(e.target.value))}
                    placeholder="Quantità (+/-)"
                    className="w-28 p-2 border rounded bg-white"
                />
                <button
                    onClick={updateStock}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    disabled={loading || quantityDelta === 0}
                >
                    Applica
                </button>

                <button
                    onClick={() => setShowAll((v) => !v)}
                    className="ml-auto px-4 py-2 border rounded bg-white"
                >
                    {showAll ? "Mostra solo questa libreria" : "Mostra tutte"}
                </button>
            </div>

            {/* LISTA STOCK */}
            <div className="space-y-2">
                {visibleStocks.length === 0 && (
                    <p className="text-gray-500">Nessuno stock presente</p>
                )}

                {visibleStocks.map((s) => (
                    <div
                        key={s.id.libraryId}
                        className="bg-white p-3 rounded border flex justify-between"
                    >
                        <span>Libreria: {s.id.libraryId}</span>
                        <span>Quantità: {s.quantity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}