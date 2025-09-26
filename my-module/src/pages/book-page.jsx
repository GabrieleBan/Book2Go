"use client";

import {useEffect, useState} from "react";
import AppHeader from "@/components/AppHeader.jsx";
import { Card } from "@/components/ui/card.js";
import { Button } from "@/components/ui/button.js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.js";
import { Textarea } from "@/components/ui/textarea.js";
import {Context} from "@/components/context-provider.jsx";
import BookCard from "@/components/book-card.jsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.js";
import StarRating from "@/components/star-rating.jsx";
import Book from "@/classes/Book.js";

export default function BookPage() {
    const [rating, setRating] = useState(0);
    const { lastBook } = Context();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // fallback book if lastBook is null
    const testBook = new Book({
        title: "Dante",
        author: "Alessandro Barbero",
        rating: 4.9,
        image: "/src/assets/dante.jpg",
        description:
            "Un uomo del Medioevo, immerso nel suo tempo. Questo il Dante che ci racconta un grande storico in pagine di vivida bellezza. Dante è l'uomo su cui, per la fama che lo accompagnava già in vita, sappiamo forse più cose che su qualunque altro uomo di quell'epoca, e che ci ha lasciato la sua testimonianza personale su cosa significava, allora, essere un giovane uomo innamorato o cosa si provava quando si saliva a cavallo per andare in battaglia. Alessandro Barbero segue Dante nella sua adolescenza di figlio d'un usuraio che sogna di appartenere al mondo dei nobili e dei letterati; nei corridoi oscuri della politica, dove gli ideali si infrangono davanti alla realtà meschina degli odi di partito e della corruzione dilagante; nei vagabondaggi dell'esiliato che scopre l'incredibile varietà dell'Italia del Trecento, fra metropoli commerciali e corti cavalleresche. Il libro affronta anche le lacune e i silenzi che rendono incerta la ricostruzione di interi periodi della vita di Dante, presentando gli argomenti pro e contro le diverse ipotesi e permettendo a chi legge di farsi una propria idea, come quando il lettore di un romanzo giallo è invitato a gareggiare con il detectivee arrivare per proprio conto a una conclusione.",
        prices: { Fisico: 33.5, Digitale: 12.0, Audiolibro: 3.0 },
    });

    const book = lastBook instanceof Book ? lastBook : testBook;

    // Recommendations as Book instances
    const recommendations = [
        new Book({
            id: 1,
            title: "The Silent Horizon",
            author: "Elena Moretti",
            rating: 5,
            prices: { Fisico: 10, Digitale: 1 },
            image: "/placeholder-book.jpg",
            description: "An epic tale of survival and hope, following the journey of a young protagonist who is forced to confront the limits of courage and endurance. Through trials of isolation, unexpected friendships, and moments of deep despair, the book paints a vivid portrait of what it truly means to find meaning in adversity. Readers are invited into a richly detailed world where every choice carries weight and consequences ripple far beyond the moment.",
            tags: ["Avventura", "Drammatico", "Sopravvivenza"]
        }),
        new Book({
            id: 2,
            title: "Whispers of the City",
            author: "Giovanni Ricci",
            rating: 4,
            prices: { Fisico: 12 },
            image: "/placeholder-book.jpg",
            description: "Set against the backdrop of a city caught between tradition and modernity, this novel weaves together the stories of strangers whose paths intertwine in unexpected ways. Exploring themes of memory, forgiveness, and the quiet strength of human bonds, it challenges readers to reflect on their own relationships and the unspoken moments that shape them. With prose both delicate and powerful, the book resonates long after the final page.",
            tags: ["Storia", "Romantico", "Drammatico"]
        }),
        new Book({
            id: 3,
            title: "Shadows Across the Steppe",
            author: "Anya Volkov",
            rating: 5,
            prices: { Fisico: 15 },
            image: "/placeholder-book.jpg",
            description: "A gripping adventure that blends mystery, danger, and the relentless pursuit of truth. The protagonist, torn between loyalty and personal ambition, embarks on a journey across unforgiving landscapes where every step reveals new secrets. With masterfully crafted suspense, this novel keeps readers at the edge of their seats, challenging them to untangle riddles that reach back into forgotten histories and hidden legacies.",
            tags: ["Avventura", "Mistero", "Thriller"]
        }),
        new Book({
            id: 4,
            title: "Echoes of Yesterday",
            author: "Marta Pellegrini",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "This introspective narrative delves into the complexities of choice, regret, and the lingering shadows of the past. Following the life of a character haunted by missed opportunities, the novel examines how a single decision can shape decades of experience. Through poignant storytelling and vivid emotional depth, it captures the fragile beauty of human resilience in the face of inevitable mistakes.",
            tags: ["Storia", "Drammatico", "Riflessivo"]
        }),
        new Book({
            id: 5,
            title: "The Garden of Ashes",
            author: "Lorenzo De Santis",
            rating: 4,
            prices: { Fisico: 9 },
            image: "/placeholder-book.jpg",
            description: "A moving exploration of love, grief, and the search for redemption. The narrative follows intertwined lives across generations, showing how bonds of family and friendship can both wound and heal. With lyrical prose and heart-stirring imagery, this book invites readers to consider the quiet heroism of forgiveness and the ways in which healing often comes from the most unexpected sources.",
            tags: ["Romantico", "Drammatico", "Famiglia"]
        }),
        new Book({
            id: 6,
            title: "Fragments of Tomorrow",
            author: "Clara Bianchi",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "A character-driven story about identity, ambition, and the long journey toward self-acceptance. Through the lens of a protagonist navigating conflicting expectations, the novel explores the fragile balance between personal dreams and societal pressures. Rich in psychological depth, it illuminates the struggles of becoming while underscoring the quiet victories that define true growth.",
            tags: ["Filosofico", "Riflessivo", "Drammatico"]
        }),
        new Book({
            id: 7,
            title: "The House of Secrets",
            author: "Francesco Vitale",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "Suspenseful and deeply atmospheric, this book plunges the reader into a labyrinth of secrets where truth hides behind carefully constructed lies. Every chapter peels back another layer of deception, building toward a revelation that is as shocking as it is inevitable. It is both a thriller and a meditation on trust, exploring how even the closest relationships can harbor devastating betrayals.",
            tags: ["Thriller", "Mistero", "Suspense"]
        }),
        new Book({
            id: 8,
            title: "A River Between Worlds",
            author: "Isabella Conti",
            rating: 4,
            prices: { Fisico: 11 },
            image: "/placeholder-book.jpg",
            description: "A sweeping saga spanning continents and decades, this novel traces the fortunes of a family bound together by love yet torn apart by ambition and circumstance. With a narrative that shifts seamlessly between intimate personal moments and grand historical events, it offers a profound exploration of heritage, identity, and the unyielding power of hope. The story resonates as both a personal journey and a universal reflection on belonging.",
            tags: ["Storia", "Famiglia", "Drammatico"]
        }),
    ];

    const reviews = [
        {
            id: 1,
            user: "Olivia Green",
            avatar: "/user-avatar.png",
            rating: 5,
            text: "Semplicemente fantastico. Una narrazione avvincente che mi ha catturato dalla prima pagina fino all'ultima.",
        },
        {
            id: 2,
            user: "Marco Rossi",
            avatar: "/user-avatar.png",
            rating: 4,
            text: "Molto interessante, dettagliato e profondo. Alcune parti un po' lente ma nel complesso eccellente.",
        },
    ];

    return (
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
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
                            {book.image ? (
                                <img
                                    src={book.image}
                                    alt={book.title}
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
                                {Object.entries(book.prices).map(([format, price]) => {
                                    // Skip formats that have null prices
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
                        <h1 className="text-3xl font-bold break-words">{book.title}</h1>
                        <p className="text-gray-600">Autore: {book.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <StarRating value={Math.round(book.rating)} />
                            <span className="text-sm">{book.rating}/5</span>
                        </div>
                        {/* I tags */}
                        <div className="w-full my-3 gap-3 flex flex-1">
                            {book.tags!=null && book.tags.map((tag)=>(
                                <Card>{tag}</Card>
                            ))}
                        </div>
                        <p className="mt-6 text-gray-700 leading-relaxed break-words">
                            {book.description}
                        </p>



                        {/* User Rating */}
                        <div className="mt-6">
                            <h3 className="font-semibold">Valuta:</h3>
                            <StarRating value={rating} onChange={setRating} size={28} />
                            <Textarea
                                placeholder="Scrivi la tua recensione..."
                                className="mt-2"
                            />
                            <Button className="mt-2">Invia</Button>
                        </div>
                    </div>
                </section>


                {/* Recommendations */}
                <section >
                    <h3 className="text-xl font-semibold mb-4">Potrebbe interessarti:</h3>
                    <Carousel className="w-[95vw] overflow-hidden"> {/* clip overflowing content */}
                        <CarouselContent className="flex  "> {/* padding-right so last card fits */}
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

                {/* Reviews */}
                <section className="w-full">
                    <h3 className="text-xl font-semibold mb-4">Recensioni</h3>
                    <div className="space-y-4">
                        {reviews.map((r) => (
                            <Card key={r.id} className="p-4 flex gap-4">
                                <img
                                    src={r.avatar}
                                    alt={r.user}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{r.user}</p>
                                    <StarRating value={r.rating} />
                                    <p className="text-gray-700 mt-2">{r.text}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                </section>
            </main>

            <div className="bg-beige-100 h-10" />
        </div>
    );
}