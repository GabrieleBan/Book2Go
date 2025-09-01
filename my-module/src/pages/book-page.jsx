"use client";

import { useState } from "react";
import AppHeader from "@/components/AppHeader.jsx";
import { Card } from "@/components/ui/card.js";
import { Button } from "@/components/ui/button.js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.js";
import { Textarea } from "@/components/ui/textarea.js";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.js";
import StarRating from "@/components/star-rating.jsx";
// ---------- BookPage ----------
export default function BookPage() {
    const [rating, setRating] = useState(0);

    const book = {
        title: "Dante",
        author: "Alessandro Barbero",
        rating: 4.9,
        cover: "/dante.jpg",
        description:
            "Un'opera del Medioevo, immensa per vastità e portata. Questo è Dante! ...",
        prices: {
            Fisico: 33.5,
            Digitale: 12.0,
            Audiolibro: 3.0,
        },
    };

    const recommendations = [
        { id: 1, title: "Book name", author: "Autore", rating: 5 },
        { id: 2, title: "Book name", author: "Autore", rating: 4 },
        { id: 3, title: "Book name", author: "Autore", rating: 5 },
        { id: 4, title: "Book name", author: "Autore", rating: 3 },
        { id: 5, title: "Book name", author: "Autore", rating: 4 },
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
        <div className="min-h-screen flex flex-col">
            <AppHeader />

            {/* Scrollable main content */}
            <main className="flex-1 px-4 md:px-8 py-6 space-y-12 overflow-y-auto">
                {/* Book Info */}
                <section className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full rounded-md shadow"
                        />

                        {/* Purchase Options */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Acquista</h3>
                            <RadioGroup defaultValue="Fisico">
                                {Object.entries(book.prices).map(([format, price]) => (
                                    <div
                                        key={format}
                                        className="flex items-center justify-between border p-2 rounded-md mb-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value={format} id={format} />
                                            <label htmlFor={format}>{format}</label>
                                        </div>
                                        <span>{price.toFixed(2)} €</span>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <p className="text-gray-600">Autore: {book.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <StarRating value={Math.round(book.rating)} />
                            <span className="text-sm">{book.rating}/5</span>
                        </div>

                        <p className="mt-6 text-gray-700 leading-relaxed">
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
                <section>
                    <h3 className="text-xl font-semibold mb-4">
                        Potrebbe interessarti:
                    </h3>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {recommendations.map((rec) => (
                                <CarouselItem
                                    key={rec.id}
                                    className="basis-1/2 sm:basis-1/3 md:basis-1/5"
                                >
                                    <Card className="p-2 text-center">
                                        <div className="h-32 bg-purple-50 flex items-center justify-center rounded">
                                            Cover
                                        </div>
                                        <p className="mt-2 font-medium">{rec.title}</p>
                                        <p className="text-sm text-gray-600">{rec.author}</p>
                                        <p className="text-yellow-500">
                                            {"★".repeat(rec.rating)}
                                        </p>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </section>

                {/* Reviews */}
                <section>
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

            {/* Bottom bar */}
            <div className="bg-beige-100 h-10" />
        </div>
    );
}