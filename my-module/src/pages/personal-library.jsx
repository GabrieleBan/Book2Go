
"use client";

import { useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import BookCard from "@/components/book-card.jsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, BookOpen } from "lucide-react";

import LibraryBook from "@/classes/LibraryBook.js";

const sampleTitles = [
    "The Silent Horizon", "Whispers of the City", "Shadows Across the Steppe",
    "Echoes of Yesterday", "The Garden of Ashes", "Fragments of Tomorrow",
    "The House of Secrets", "A River Between Worlds", "Lost in the Mist",
    "Beyond the Stars", "The Forgotten Path", "Crimson Night"
];

const sampleAuthors = [
    "Elena Moretti", "Giovanni Ricci", "Anya Volkov", "Marta Pellegrini",
    "Lorenzo De Santis", "Clara Bianchi", "Francesco Vitale", "Isabella Conti"
];

const sampleTags = [
    ["Avventura", "Sopravvivenza"],
    ["Romantico", "Drammatico"],
    ["Thriller", "Mistero"],
    ["Storia", "Famiglia"],
    ["Fantascienza", "Avventura"],
    ["Horror", "Suspense"]
];

const booksData = Array.from({ length: 40 }, (_, i) => {
    const title = sampleTitles[i % sampleTitles.length] + (i >= sampleTitles.length ? ` Vol. ${Math.floor(i / sampleTitles.length) + 1}` : "");
    const author = sampleAuthors[i % sampleAuthors.length];
    const rating = Math.floor(Math.random() * 5) + 1; // 1-5
    const isDigital = Math.random() < 0.4;
    const isLent = Math.random() < 0.3;
    const expireDate = isLent ? new Date(Date.now() + Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000) : null;
    const tags = sampleTags[i % sampleTags.length];

    // realistic prices
    const prices = {};
    if (Math.random() < 0.8) prices.Fisico = 8 + Math.floor(Math.random() * 15);
    if (Math.random() < 0.7) prices.Digitale = 3 + Math.floor(Math.random() * 10);
    if (Math.random() < 0.5) prices.Audiolibro = 5 + Math.floor(Math.random() * 10);

    return new LibraryBook({
        id: i + 1,
        title,
        author,
        rating,
        image: "/placeholder-book.jpg",
        description: `A captivating story for "${title}" by ${author}. This book will take you on an unforgettable journey filled with emotions, twists, and insights.`,
        prices,
        format: isDigital ? "Digitale" : "Fisico",
        owned: !isLent,
        lent: isLent,
        expireDate,
        tags
    });
});

export default function LibraryPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all"); // all | owned | lend
    const [sortBy, setSortBy] = useState("recent"); // recent | title | rating
    const [page, setPage] = useState(1);

    const showCount = 24; // 4 rows of 6 books
    const totalPages = Math.ceil(booksData.length / showCount);

    // ---------- Filtering + sorting ----------
    const filteredBooks = useMemo(() => {
        let result = booksData.filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
        );

        if (filter === "owned") result = result.filter((b) => b.owned);
        if (filter === "lend") result = result.filter((b) => b.lent);

        if (sortBy === "title") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
        if (sortBy === "recent") result = [...result].reverse();

        return result;
    }, [search, filter, sortBy]);

    const paginatedBooks = filteredBooks.slice((page - 1) * showCount, page * showCount);

    // ---------- Helper to calculate remaining days ----------
    const getRemainingDays = (expireDate) => {
        const diff = expireDate.getTime() - Date.now();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="min-h-screen w-screen bg-white flex flex-col">
            <AppHeader />

            <main className="flex-1 px-4 md:px-8 py-6">
                {/* Title */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl">⬅</span>
                    <h1 className="text-3xl font-bold">La tua libreria</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                    <Input
                        placeholder="Cerca nella tua libreria"
                        className="max-w-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="flex gap-4 flex-1 justify-end">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <Select defaultValue="all" onValueChange={setFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="owned">Owned</SelectItem>
                                    <SelectItem value="lend">Lend</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Sort By</span>
                            <Select defaultValue="recent" onValueChange={setSortBy}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Sort" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Recently added</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="rating">Rating</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {paginatedBooks.map((book) => {
                        const isExpiring = book.lent && book.expireDate && getRemainingDays(book.expireDate) <= 7;

                        return (
                            <div key={book.id} className="relative w-[180px]">
                                <BookCard book={book} />

                                {/* Expiring badge */}
                                {book.lent && book.expireDate && getRemainingDays(book.expireDate) <= 7 && (
                                    <div className="absolute top-2 left-2 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded shadow text-gray-700">
                                        <Clock className="h-3 w-3" />
                                        {getRemainingDays(book.expireDate)} days
                                    </div>
                                )}

                                {/* Digital format badge */}
                                {book.format === "Digitale" && (
                                    <div className="absolute top-2 right-1 w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center shadow">
                                        <BookOpen className="h-3 w-3 text-gray-600" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Pagination */}
            <div className="bg-beige-100 py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === i + 1}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {totalPages > 5 && <PaginationEllipsis />}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}