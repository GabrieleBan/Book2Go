import { useState } from "react";
import AppHeader from "@/components/AppHeader.jsx";
import BookCard from "@/components/book-card.jsx";
import Book from "@/classes/Book.js";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.js";

export default function HomePage() {
    const [trendingBooks] = useState([
        new Book({
            id: 1,
            title: "The Metamorphosis",
            author: "Franz Kafka",
            rating: 4,
            image: "/kafka.jpg",
            description: "A novella by Franz Kafka about the surreal transformation of Gregor Samsa...",
            prices: { Fisico: 12.0, Digitale: 8.0, Audiolibro: 5.0 },
        }),
        new Book({
            id: 2,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            rating: 5,
            image: "/hobbit.jpg",
            description: "Bilbo Baggins embarks on a journey filled with adventure and magic...",
            prices: { Fisico: 20.0, Digitale: 15.0, Audiolibro: 10.0 },
        }),
        new Book({
            id: 3,
            title: "Dune",
            author: "Frank Herbert",
            rating: 5,
            image: "/dune.jpg",
            description: "The epic tale of Paul Atreides and the desert planet Arrakis...",
            prices: { Fisico: 28.0, Digitale: 20.0, Audiolibro: 15.0 },
        }),
        new Book({
            id: 4,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            rating: 4,
            image: "/sapiens.jpg",
            description: "A brief history of humankind from the Stone Age to the modern age...",
            prices: { Fisico: 25.0, Digitale: 18.0, Audiolibro: 12.0 },
        }),
    ]);

    const [recommendedBooks] = useState([
        new Book({
            id: 5,
            title: "Il Nome della Rosa",
            author: "Umberto Eco",
            rating: 5,
            image: "/nome-della-rosa.jpg",
            description: "A historical murder mystery set in an Italian monastery during the 14th century...",
            prices: { Fisico: 30.0, Digitale: 20.0, Audiolibro: 15.0 },
        }),
        new Book({
            id: 6,
            title: "1984",
            author: "George Orwell",
            rating: 5,
            image: "/1984.jpg",
            description: "A dystopian novel about totalitarian surveillance and oppression...",
            prices: { Fisico: 18.0, Digitale: 12.0, Audiolibro: 8.0 },
        }),
        new Book({
            id: 7,
            title: "Brave New World",
            author: "Aldous Huxley",
            rating: 4,
            image: "/brave-new-world.jpg",
            description: "A dystopian future exploring science, technology, and societal control...",
            prices: { Fisico: 15.0, Digitale: 10.0, Audiolibro: 7.0 },
        }),
        new Book({
            id: 8,
            title: "Divina Commedia",
            author: "Dante Alighieri",
            rating: 5,
            image: "/divina-commedia.jpg",
            description: "Dante's epic poem journeying through Hell, Purgatory, and Paradise...",
            prices: { Fisico: 35.0, Digitale: 25.0, Audiolibro: 20.0 },
        }),
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
                    <h2 className="text-2xl font-semibold mb-4">Trending Books</h2>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {trendingBooks.map((book) => (
                                <CarouselItem key={book.id} className="basis-1/2 md:basis-1/4">
                                    <BookCard book={book} />
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
                        <CarouselContent>
                            {recommendedBooks.map((book) => (
                                <CarouselItem key={book.id} className="basis-1/2 md:basis-1/4">
                                    <BookCard book={book} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-beige-100 text-center py-4 text-sm text-gray-600">
                <p>© 2025 Book2Go — All rights reserved</p>
            </footer>
        </div>
    );
}