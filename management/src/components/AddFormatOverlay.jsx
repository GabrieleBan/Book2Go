import React, { useState } from "react";


export default function AddFormatOverlay({ isOpen, onClose, onAddFormat }) {
    const [newFormat, setNewFormat] = useState({
        formatType: "PAPERBACK", // Default
        purchasePrice: 0,
        discountPercentage: 0,
        isbn: "",
        numberOfPages: 0
    });

    // Funzione per inviare il nuovo formato
    const handleAddFormat = () => {
        if (!newFormat.purchasePrice || !newFormat.isbn) {
            alert("Compila tutti i campi obbligatori!");
            return;
        }
        onAddFormat(newFormat);
        onClose(); // Chiudi il modal
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Aggiungi Nuovo Formato</h3>

                <div className="space-y-6">
                    {/* Formato */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700">Tipo di formato</label>
                        <select
                            value={newFormat.formatType}
                            onChange={(e) => setNewFormat({ ...newFormat, formatType: e.target.value })}
                            className="w-full p-2 border rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="PHYSICAL">Fisico</option>
                            <option value="EBOOK">Ebook</option>
                            <option value="AUDIOBOOK">Audiolibro</option>
                            <option value="HARDCOVER">Copertina Rigida</option>
                            <option value="PAPERBACK">Copertina Flessibile</option>
                        </select>
                    </div>

                    {/* Prezzo */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700">Prezzo</label>
                        <input
                            type="number"
                            placeholder="Inserisci il prezzo"
                            value={newFormat.purchasePrice}
                            onChange={(e) => setNewFormat({ ...newFormat, purchasePrice: parseFloat(e.target.value) })}
                            className="w-full p-2 border rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Sconto */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700">Sconto (%)</label>
                        <input
                            type="number"
                            placeholder="Sconto in percentuale"
                            value={newFormat.discountPercentage}
                            onChange={(e) => setNewFormat({ ...newFormat, discountPercentage: parseFloat(e.target.value) })}
                            className="w-full p-2 border rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* ISBN */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700">ISBN</label>
                        <input
                            type="text"
                            placeholder="Inserisci l'ISBN"
                            value={newFormat.isbn}
                            onChange={(e) => setNewFormat({ ...newFormat, isbn: e.target.value })}
                            className="w-full p-2 border rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    {/* Numero di Pagine */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-700">Numero di Pagine</label>
                        <input
                            type="number"
                            placeholder="Numero di pagine"
                            value={newFormat.numberOfPages}
                            onChange={(e) => setNewFormat({ ...newFormat, numberOfPages: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Bottoni */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-300 p-2 rounded text-sm text-gray-800 hover:bg-gray-400"
                        >
                            Annulla
                        </button>
                        <button
                            onClick={handleAddFormat}
                            className="bg-blue-500 p-2 rounded text-sm text-white hover:bg-blue-600"
                        >
                            Aggiungi Formato
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}