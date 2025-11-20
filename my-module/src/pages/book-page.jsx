"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader.jsx";
import { Card } from "@/components/ui/card.js";
import { Button } from "@/components/ui/button.js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.js";
import { Textarea } from "@/components/ui/textarea.js";
import { Context } from "@/components/context-provider.jsx";
import BookCard from "@/components/book-card.jsx";
import Review from "@/classes/Review.js";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.js";
import StarRating from "@/components/star-rating.jsx";
import BookDetails from "@/classes/BookDetails.js";
import BookSummary from "@/classes/BookSummary.js";

export default function BookPage() {
    const [book, setBook] = useState(null);
    const [rating, setRating] = useState(0);
    const { getTokens, lastBook } = Context();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        async function loadBook() {
            if (!lastBook?.id) return;

            try {
                const detailedBook = await BookDetails.fetchById(lastBook.id);
                setBook(detailedBook);

            } catch (err) {
                console.error("Errore fetch book details:", err);
                // fallback
                setBook(testBook);
            }
        }

        loadBook();
    }, [lastBook]);

    // Fallback book se fetch non è pronta
    const testBook = new BookDetails({
        title: "Dante",
        author: "Alessandro Barbero",
        rating: 4.9,
        image: "/src/assets/dante.jpg",
        description:
            "Un uomo del Medioevo, immerso nel suo tempo. Questo il Dante che ci racconta un grande storico in pagine di vivida bellezza. Dante è l'uomo su cui, per la fama che lo accompagnava già in vita, sappiamo forse più cose che su qualunque altro uomo di quell'epoca...",
        prices: { Fisico: 33.5, Digitale: 12.0, Audiolibro: 3.0 },
        tags: ["Storia", "Medioevo", "Biografia"]
    });

    const bookToRender = book ?? testBook;

    // Recommendations as BookSummary instances
    const recommendations = [
        new BookSummary({
            id: 1,
            title: "The Silent Horizon",
            author: "Elena Moretti",
            rating: 5,
            prices: { Fisico: 10, Digitale: 1 },
            image: "/placeholder-book.jpg",
            description: "An epic tale of survival and hope...",
            tags: ["Avventura", "Drammatico", "Sopravvivenza"]
        }),
        new BookSummary({
            id: 2,
            title: "Whispers of the City",
            author: "Giovanni Ricci",
            rating: 4,
            prices: { Fisico: 12 },
            image: "/placeholder-book.jpg",
            description: "Set against the backdrop of a city...",
            tags: ["Storia", "Romantico", "Drammatico"]
        }),
        new BookSummary({
            id: 3,
            title: "Shadows Across the Steppe",
            author: "Anya Volkov",
            rating: 5,
            prices: { Fisico: 15 },
            image: "/placeholder-book.jpg",
            description: "A gripping adventure that blends mystery...",
            tags: ["Avventura", "Mistero", "Thriller"]
        }),
        new BookSummary({
            id: 4,
            title: "Echoes of Yesterday",
            author: "Marta Pellegrini",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "This introspective narrative delves into...",
            tags: ["Storia", "Drammatico", "Riflessivo"]
        }),
        new BookSummary({
            id: 5,
            title: "The Garden of Ashes",
            author: "Lorenzo De Santis",
            rating: 4,
            prices: { Fisico: 9 },
            image: "/placeholder-book.jpg",
            description: "A moving exploration of love, grief...",
            tags: ["Romantico", "Drammatico", "Famiglia"]
        }),
        new BookSummary({
            id: 6,
            title: "Fragments of Tomorrow",
            author: "Clara Bianchi",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "A character-driven story about identity...",
            tags: ["Filosofico", "Riflessivo", "Drammatico"]
        }),
        new BookSummary({
            id: 7,
            title: "The House of Secrets",
            author: "Francesco Vitale",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "Suspenseful and deeply atmospheric...",
            tags: ["Thriller", "Mistero", "Suspense"]
        }),
        new BookSummary({
            id: 8,
            title: "A River Between Worlds",
            author: "Isabella Conti",
            rating: 4,
            prices: { Fisico: 11 },
            image: "/placeholder-book.jpg",
            description: "A sweeping saga spanning continents...",
            tags: ["Storia", "Famiglia", "Drammatico"]
        }),
    ];


    const pageSize = 5;
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [isLast, setIsLast] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");
    useEffect(() => {
        if (!lastBook?.id) return;

        async function loadFirstPage() {
            try {
                const res = await Review.fetchReviewByBookIdPaginated(lastBook.id, 0, pageSize);

                setReviews(res.reviews);
                setPage(0);
                setIsLast(res.isLast);
            } catch (err) {
                console.error("Errore nel caricamento recensioni:", err);
            }
        }

        loadFirstPage();
    }, [lastBook]);
    async function loadMoreReviews() {
        if (isLast || loadingMore) return;

        setLoadingMore(true);

        try {
            const nextPage = page + 1;
            const res = await Review.fetchReviewByBookIdPaginated(lastBook.id, nextPage, pageSize);

            setReviews(prev => [...prev, ...res.reviews]);
            setPage(nextPage);
            setIsLast(res.isLast);

        } catch (err) {
            console.error("Errore caricamento altre recensioni:", err);
        }

        setLoadingMore(false);
    }
    function formatDate(d) {
        const date = d instanceof Date ? d : new Date(d);
        return date.toLocaleDateString("it-IT", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    async function sendReview() {

        const token = getTokens()?.accessToken;

        // Controllo campi obbligatori
        if (!reviewTitle.trim() || !reviewText.trim()) {
            alert("Per favore, compila tutti i campi obbligatori (titolo e testo).");
            return;
        }

        if (!lastBook?.id) {
            alert("Errore: libro non selezionato");
            return;
        }

        const reviewToPost = {
            bookId: lastBook.id,
            overallScore: rating || 0,
            title: reviewTitle.trim(),
            text: reviewText.trim()
        };

        try {
            // 🔹 Usa la funzione statica della classe Review
            const result = await Review.postReview(token, reviewToPost);

            // Pulizia campi dopo l'invio
            setRating(0);
            setReviewTitle("");
            setReviewText("");

            alert("Recensione inviata con successo!");
            // 🔹 eventualmente aggiorna la lista review, es: ricarica da server
        } catch (err) {
            console.error(err);
            alert(err);
        }
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-white">
            <AppHeader />

            <main className="flex-1 w-full px-4 py-6 space-y-12 overflow-y-auto box-border">
                {/* Book Info */}
                <section className="flex flex-col md:flex-row gap-8 items-start w-full">
                    {/* Image + Purchase Options */}
                    <div className="flex flex-col self-start w-full md:w-[400px]">
                        <div
                            className="relative rounded-md shadow overflow-hidden bg-purple-50 flex items-center justify-center w-full"
                            style={{ height: "500px" }}
                        >
                            {bookToRender.image ? (
                                <img
                                    src={bookToRender.image}
                                    alt={bookToRender.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-400">No Cover</span>
                            )}
                        </div>

                        {/* Purchase Options */}
                        <div className="mt-6 w-full">
                            <h5 className="font-semibold mb-2">Formati</h5>
                            <RadioGroup defaultValue="Fisico">
                                {Object.entries(bookToRender.prices).map(([format, price]) => {
                                    if (price === null) return null;
                                    return (
                                        <div
                                            key={format}
                                            className="flex items-center justify-between border p-2 rounded-md mb-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem
                                                    value={format}
                                                    id={format}
                                                    className="h-4 w-4 border border-gray-400 rounded-full
                          data-[state=checked]:bg-black data-[state=checked]:border-black"
                                                />
                                                <label htmlFor={format}>{format}</label>
                                            </div>
                                            <span>{price.toFixed(2)} €</span>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                            <div className="w-full flex items-center justify-end">
                                <Button>Acquista</Button>
                            </div>
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold break-words">{bookToRender.title}</h1>
                        <p className="text-gray-600">Autore: {bookToRender.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <StarRating value={Math.round(bookToRender.rating)} />
                            <span className="text-sm">{bookToRender.rating}/5</span>
                        </div>

                        {/* Tags */}
                        <div className="w-full my-3 gap-3 flex flex-1">
                            {bookToRender.tags?.map((tag) => (
                                <Card key={tag}>{tag}</Card>
                            ))}
                        </div>

                        <p className="mt-6 text-gray-700 leading-relaxed break-words">
                            {bookToRender.description}
                        </p>

                        {/* User Rating */}
                        <div className="mt-6">
                            <h3 className="font-semibold">Valuta:</h3>

                            <StarRating value={rating} onChange={setRating} size={28} />

                            <Textarea
                                placeholder="Titolo della recensione"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                className="mt-2 h-15 resize-none"
                            />

                            <Textarea
                                placeholder="Scrivi la tua recensione..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="mt-2"
                            />

                            <Button
                                onClick={sendReview}
                                className="mt-2"
                            >
                                Invia
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Recommendations */}
                <section>
                    <h3 className="text-xl font-semibold mb-4">Potrebbe interessarti:</h3>
                    <Carousel className="w-[95vw] overflow-hidden">
                        <CarouselContent className="flex">
                            {recommendations.map((rec) => (
                                <CarouselItem
                                    key={rec.id}
                                    className="basis-[200px] flex-shrink-0 flex justify-center"
                                >
                                    <div className="w-[180px] h-[280px]">
                                        <BookCard book={rec} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </section>

                <section className="w-full">
                    <h3 className="text-xl font-semibold mb-4">Recensioni</h3>

                    <div className="space-y-4">
                        {reviews.map((r) => (
                            <Card key={r.id} className="p-4 flex gap-4">
                                <img
                                    src={r.avatar ?? "/default-avatar.png"}
                                    alt={r.user ?? "Utente"}
                                    className="w-12 h-12 rounded-full"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">{r.user ?? "Utente anonimo"}</p>
                                        <span className="text-sm text-gray-500">{formatDate(r.date)}</span>
                                    </div>

                                    <StarRating value={Math.round(r.rating ?? 0)} />
                                    <p className="text-gray-700 mt-2">{r.text}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Bottone "carica altre" */}
                    {!isLast && (
                        <div className="w-full flex justify-center mt-4">
                            <Button onClick={loadMoreReviews} disabled={loadingMore}>
                                {loadingMore ? "Caricamento..." : "Carica altre recensioni"}
                            </Button>
                        </div>
                    )}
                </section>
            </main>

            <div className="bg-beige-100 h-10" />
        </div>
    );
}