import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";
import { Context } from "@/components/context-provider.jsx";
import { API } from "@/utils/api.js";
import SearchableTags from "@/components/searchable-tags.jsx";

export default function AddBookModal({ isOpen, onClose }) {
    const {tokens} = Context();

    const [title, setTitle] = useState("");
    const [edition, setEdition] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDesc, setNewCategoryDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    // Carica categorie all'apertura modal
    useEffect(() => {
        if (!isOpen) return;

        async function loadCategories() {
            try {
                const res = await fetch(`${API.BOOK}/categories`, {
                });
                const data = await res.json();
                setAllCategories(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadCategories();
    }, [isOpen]);

    const handleCreateBook = async () => {
        if (!title || !author || categories.length === 0) {
            setFeedback("Titolo, autore e almeno una categoria sono obbligatori");
            return;
        }

        setLoading(true);
        setFeedback("");

        try {
            // 1️⃣ Creazione libro
            const res = await fetch(`${API.BOOK}/books/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokens?.accessToken}`,
                },
                body: JSON.stringify({
                    title,
                    edition,
                    author,
                    description,
                    publisher,
                    publicationDate,
                    categoryIds: categories.map(c => c.id),
                }),
            });

            let data;
            try { data = await res.json(); } catch { data = {}; }

            if (!res.ok) {
                setFeedback(data.message || "Errore nella creazione del libro");
                return;
            }

            const bookId = data.id;

            if (coverFile) {
                try {
                    const formData = new FormData();
                    formData.append("file", coverFile);

                    const imgRes = await fetch(`${API.CONTENT}/content/${bookId}/cover-image`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${tokens?.accessToken}`,
                        },
                        body: formData,
                    });

                    let imgData;
                    try { imgData = await imgRes.json(); } catch { imgData = {}; }

                    if (!imgRes.ok) {
                        console.warn("Errore upload immagine:", imgData.message);
                        setFeedback(`Libro creato, ma errore immagine: ${imgData.message || imgRes.status}`);
                        return;
                    }
                } catch (err) {
                    console.error("Errore upload immagine:", err);
                    setFeedback("Libro creato, ma errore caricamento immagine");
                    return;
                }
            }

            //  ok
            setFeedback("Libro creato con successo!");
            setCoverFile(null);
            setCoverPreview(null);
            setTitle(""); setEdition(""); setAuthor(""); setDescription("");
            setPublisher(""); setPublicationDate(""); setCategories([]);
        } catch (err) {
            console.error(err);
            setFeedback("Errore di comunicazione con il server");
        } finally {
            setLoading(false);
        }
    };


    const handleAddCategory = async () => {
        if (!newCategoryName) return;
        try {
            const res = await fetch(`${API.BOOK}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokens?.accessToken}`,
                },
                body: JSON.stringify({
                    name: newCategoryName,
                    description: newCategoryDesc,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Errore nella creazione categoria");
            } else {
                setAllCategories(prev => [...prev, data]);
                setCategories(prev => [...prev, data]);
                setNewCategoryName("");
                setNewCategoryDesc("");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
                {/* Bottone chiudi */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
                    onClick={onClose}
                >×
                </button>

                <h2 className="text-2xl font-bold mb-4">Aggiungi Libro</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Titolo" value={title} onChange={e => setTitle(e.target.value)}/>
                    <Input placeholder="Autore" value={author} onChange={e => setAuthor(e.target.value)}/>
                    <Input placeholder="Edizione" value={edition} onChange={e => setEdition(e.target.value)}/>
                    <Input placeholder="Casa editrice" value={publisher} onChange={e => setPublisher(e.target.value)}/>
                    <Input type="date" value={publicationDate} onChange={e => setPublicationDate(e.target.value)}/>
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="font-semibold">Copertina (opzionale)</label>
                        <input type="file" accept="image/*" onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                setCoverFile(file);
                                setCoverPreview(URL.createObjectURL(file));
                            } else {
                                setCoverFile(null);
                                setCoverPreview(null);
                            }
                        }} />
                        {coverPreview && (
                            <img src={coverPreview} alt="Anteprima copertina" className="h-32 mt-2 object-contain border rounded" />
                        )}
                    </div>
                    {/* Categorie selezionabili */}
                    <div className="flex flex-col">
                        <span className="font-semibold mb-1">Categorie</span>

                        <SearchableTags
                            tags={allCategories}
                            selectedTags={categories}
                            setSelectedTags={setCategories}
                            maxVisible={50}
                        />

                        {/* Aggiungi nuova categoria */}
                        <div className="mt-2 flex flex-col gap-1">
                            <Input
                                placeholder="Nuova categoria"
                                value={newCategoryName}
                                onChange={e => setNewCategoryName(e.target.value)}
                            />
                            <Input
                                placeholder="Descrizione categoria"
                                value={newCategoryDesc}
                                onChange={e => setNewCategoryDesc(e.target.value)}
                            />
                            <Button onClick={handleAddCategory} size="sm">
                                Aggiungi categoria
                            </Button>
                        </div>
                    </div>


                    <Textarea
                        placeholder="Descrizione"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="md:col-span-2"
                    />
                </div>

                {feedback && (
                    <p className={`mb-2 font-semibold ${feedback.includes("successo") ? "text-green-600" : "text-red-600"}`}>
                        {feedback}
                    </p>
                )}

                <Button onClick={handleCreateBook} disabled={loading}>
                    {loading ? "Creazione..." : "Crea Libro"}
                </Button>
            </div>
        </div>
    );
}