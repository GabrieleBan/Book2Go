import { useState } from "react";
import AppHeader from "@/components/AppHeader.jsx";
import BookCard from "@/components/book-card.jsx";
import BookSummary from "@/classes/BookSummary.js";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.js";

export default function HomePage() {
    const [trendingBooks] = useState([
        new BookSummary({
            id: 1,
            title: "The Silent Horizon",
            author: "Elena Moretti",
            rating: 5,
            prices: { Fisico: 10, Digitale: 1 },
            image: "/placeholder-book.jpg",
            description: "An epic tale of survival and hope, following the journey of a young protagonist who is forced to confront the limits of courage and endurance. Through trials of isolation, unexpected friendships, and moments of deep despair, the book paints a vivid portrait of what it truly means to find meaning in adversity. Readers are invited into a richly detailed world where every choice carries weight and consequences ripple far beyond the moment.",
            tags: ["Avventura", "Drammatico", "Sopravvivenza"]
        }),
        new BookSummary({
            id: 2,
            title: "Whispers of the City",
            author: "Giovanni Ricci",
            rating: 4,
            prices: { Fisico: 12 },
            image: "/placeholder-book.jpg",
            description: "Set against the backdrop of a city caught between tradition and modernity, this novel weaves together the stories of strangers whose paths intertwine in unexpected ways. Exploring themes of memory, forgiveness, and the quiet strength of human bonds, it challenges readers to reflect on their own relationships and the unspoken moments that shape them. With prose both delicate and powerful, the book resonates long after the final page.",
            tags: ["Storia", "Romantico", "Drammatico"]
        }),
        new BookSummary({
            id: 3,
            title: "Shadows Across the Steppe",
            author: "Anya Volkov",
            rating: 5,
            prices: { Fisico: 15 },
            image: "/placeholder-book.jpg",
            description: "A gripping adventure that blends mystery, danger, and the relentless pursuit of truth. The protagonist, torn between loyalty and personal ambition, embarks on a journey across unforgiving landscapes where every step reveals new secrets. With masterfully crafted suspense, this novel keeps readers at the edge of their seats, challenging them to untangle riddles that reach back into forgotten histories and hidden legacies.",
            tags: ["Avventura", "Mistero", "Thriller"]
        }),
        new BookSummary({
            id: 4,
            title: "Echoes of Yesterday",
            author: "Marta Pellegrini",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "This introspective narrative delves into the complexities of choice, regret, and the lingering shadows of the past. Following the life of a character haunted by missed opportunities, the novel examines how a single decision can shape decades of experience. Through poignant storytelling and vivid emotional depth, it captures the fragile beauty of human resilience in the face of inevitable mistakes.",
            tags: ["Storia", "Drammatico", "Riflessivo"]
        }),
        new BookSummary({
            id: 5,
            title: "The Garden of Ashes",
            author: "Lorenzo De Santis",
            rating: 4,
            prices: { Fisico: 9 },
            image: "/placeholder-book.jpg",
            description: "A moving exploration of love, grief, and the search for redemption. The narrative follows intertwined lives across generations, showing how bonds of family and friendship can both wound and heal. With lyrical prose and heart-stirring imagery, this book invites readers to consider the quiet heroism of forgiveness and the ways in which healing often comes from the most unexpected sources.",
            tags: ["Romantico", "Drammatico", "Famiglia"]
        }),
        new BookSummary({
            id: 6,
            title: "Fragments of Tomorrow",
            author: "Clara Bianchi",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "A character-driven story about identity, ambition, and the long journey toward self-acceptance. Through the lens of a protagonist navigating conflicting expectations, the novel explores the fragile balance between personal dreams and societal pressures. Rich in psychological depth, it illuminates the struggles of becoming while underscoring the quiet victories that define true growth.",
            tags: ["Filosofico", "Riflessivo", "Drammatico"]
        }),
        new BookSummary({
            id: 7,
            title: "The House of Secrets",
            author: "Francesco Vitale",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "Suspenseful and deeply atmospheric, this book plunges the reader into a labyrinth of secrets where truth hides behind carefully constructed lies. Every chapter peels back another layer of deception, building toward a revelation that is as shocking as it is inevitable. It is both a thriller and a meditation on trust, exploring how even the closest relationships can harbor devastating betrayals.",
            tags: ["Thriller", "Mistero", "Suspense"]
        }),
        new BookSummary({
            id: 8,
            title: "A River Between Worlds",
            author: "Isabella Conti",
            rating: 4,
            prices: { Fisico: 11 },
            image: "/placeholder-book.jpg",
            description: "A sweeping saga spanning continents and decades, this novel traces the fortunes of a family bound together by love yet torn apart by ambition and circumstance. With a narrative that shifts seamlessly between intimate personal moments and grand historical events, it offers a profound exploration of heritage, identity, and the unyielding power of hope. The story resonates as both a personal journey and a universal reflection on belonging.",
            tags: ["Storia", "Famiglia", "Drammatico"]
        })
    ]);

    const [recommendedBooks] = useState([
        new BookSummary({
            id: 1,
            title: "The Silent Horizon",
            author: "Elena Moretti",
            rating: 5,
            prices: { Fisico: 10, Digitale: 1 },
            image: "/placeholder-book.jpg",
            description: "An epic tale of survival and hope, following the journey of a young protagonist who is forced to confront the limits of courage and endurance. Through trials of isolation, unexpected friendships, and moments of deep despair, the book paints a vivid portrait of what it truly means to find meaning in adversity. Readers are invited into a richly detailed world where every choice carries weight and consequences ripple far beyond the moment.",
            tags: ["Avventura", "Drammatico", "Sopravvivenza"]
        }),
        new BookSummary({
            id: 2,
            title: "Whispers of the City",
            author: "Giovanni Ricci",
            rating: 4,
            prices: { Fisico: 12 },
            image: "/placeholder-book.jpg",
            description: "Set against the backdrop of a city caught between tradition and modernity, this novel weaves together the stories of strangers whose paths intertwine in unexpected ways. Exploring themes of memory, forgiveness, and the quiet strength of human bonds, it challenges readers to reflect on their own relationships and the unspoken moments that shape them. With prose both delicate and powerful, the book resonates long after the final page.",
            tags: ["Storia", "Romantico", "Drammatico"]
        }),
        new BookSummary({
            id: 3,
            title: "Shadows Across the Steppe",
            author: "Anya Volkov",
            rating: 5,
            prices: { Fisico: 15 },
            image: "/placeholder-book.jpg",
            description: "A gripping adventure that blends mystery, danger, and the relentless pursuit of truth. The protagonist, torn between loyalty and personal ambition, embarks on a journey across unforgiving landscapes where every step reveals new secrets. With masterfully crafted suspense, this novel keeps readers at the edge of their seats, challenging them to untangle riddles that reach back into forgotten histories and hidden legacies.",
            tags: ["Avventura", "Mistero", "Thriller"]
        }),
        new BookSummary({
            id: 4,
            title: "Echoes of Yesterday",
            author: "Marta Pellegrini",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "This introspective narrative delves into the complexities of choice, regret, and the lingering shadows of the past. Following the life of a character haunted by missed opportunities, the novel examines how a single decision can shape decades of experience. Through poignant storytelling and vivid emotional depth, it captures the fragile beauty of human resilience in the face of inevitable mistakes.",
            tags: ["Storia", "Drammatico", "Riflessivo"]
        }),
        new BookSummary({
            id: 5,
            title: "The Garden of Ashes",
            author: "Lorenzo De Santis",
            rating: 4,
            prices: { Fisico: 9 },
            image: "/placeholder-book.jpg",
            description: "A moving exploration of love, grief, and the search for redemption. The narrative follows intertwined lives across generations, showing how bonds of family and friendship can both wound and heal. With lyrical prose and heart-stirring imagery, this book invites readers to consider the quiet heroism of forgiveness and the ways in which healing often comes from the most unexpected sources.",
            tags: ["Romantico", "Drammatico", "Famiglia"]
        }),
        new BookSummary({
            id: 6,
            title: "Fragments of Tomorrow",
            author: "Clara Bianchi",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "A character-driven story about identity, ambition, and the long journey toward self-acceptance. Through the lens of a protagonist navigating conflicting expectations, the novel explores the fragile balance between personal dreams and societal pressures. Rich in psychological depth, it illuminates the struggles of becoming while underscoring the quiet victories that define true growth.",
            tags: ["Filosofico", "Riflessivo", "Drammatico"]
        }),
        new BookSummary({
            id: 7,
            title: "The House of Secrets",
            author: "Francesco Vitale",
            rating: 3,
            prices: { Fisico: 8 },
            image: "/placeholder-book.jpg",
            description: "Suspenseful and deeply atmospheric, this book plunges the reader into a labyrinth of secrets where truth hides behind carefully constructed lies. Every chapter peels back another layer of deception, building toward a revelation that is as shocking as it is inevitable. It is both a thriller and a meditation on trust, exploring how even the closest relationships can harbor devastating betrayals.",
            tags: ["Thriller", "Mistero", "Suspense"]
        }),
        new BookSummary({
            id: 8,
            title: "A River Between Worlds",
            author: "Isabella Conti",
            rating: 4,
            prices: { Fisico: 11 },
            image: "/placeholder-book.jpg",
            description: "A sweeping saga spanning continents and decades, this novel traces the fortunes of a family bound together by love yet torn apart by ambition and circumstance. With a narrative that shifts seamlessly between intimate personal moments and grand historical events, it offers a profound exploration of heritage, identity, and the unyielding power of hope. The story resonates as both a personal journey and a universal reflection on belonging.",
            tags: ["Storia", "Famiglia", "Drammatico"]
        })
    ]);

    return (
        <div className="min-h-screen w-screen bg-white flex flex-col">
            {/* Header */}
            <AppHeader />

            <main className="flex-1  w-full">
                {/* Hero Banner */}
                <section className="relative flex w-full h-[70vh] bg-cover bg-center flex   text-white"
                         style={{ backgroundImage: "url(/library-banner.png)" }}>
                    <div className="bg-black/40 p-6 rounded-lg w-full text-center">
                        {/*<h1 className="text-4xl font-bold">Book2Go</h1>*/}
                        {/*<p className="text-lg mt-2">Read Whenever, Whatever</p>*/}
                    </div>
                </section>

                {/* Trending Books */}
                <section className="px-6 py-8">

                    {/* Trending Books */}
                    <section className="px-6 py-8">
                        <h2 className="text-2xl font-semibold mb-4">Trending Books</h2>
                        <Carousel className="w-full">
                            <CarouselContent className="flex gap-4">
                                {trendingBooks.map((book) => (
                                    <CarouselItem key={book.id} className="flex-none">
                                        <div className="w-[180px] h-auto">
                                            <BookCard book={book} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </section>

                    {/* Recommended for you */}
                    <section className="px-6 py-8">
                        <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
                        <Carousel className="w-full">
                            <CarouselContent className="flex gap-4">
                                {recommendedBooks.map((book) => (
                                    <CarouselItem key={book.id} className="flex-none">
                                        <div className="w-[180px] h-auto">
                                            <BookCard book={book} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </section>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-beige-100 text-center py-4 text-sm text-gray-600">
                <p>© 2025 Book2Go — All rights reserved</p>
            </footer>
        </div>
    );
}