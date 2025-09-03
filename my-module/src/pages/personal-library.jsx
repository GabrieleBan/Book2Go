
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
import Book from "@/classes/Book.js";

// ---------- Generate books as Book instances ----------
const booksData = Array.from({ length: 40 }, (_, i) => {
    const isDigital = i % 3 === 0;
    const isLent = i % 4 === 0;
    const expireDate = isLent ? new Date(Date.now() + (i % 10) * 24 * 60 * 60 * 1000) : null;

    return new Book({
        id: i + 1,
        title: `Book ${i + 1}`,
        author: `Author ${i + 1}`,
        rating: (i % 5) + 1,
        image: "/placeholder-book.jpg",
        description: `Description for Book ${i + 1}`,
        prices: { Fisico: 10 + (i % 15), Digitale: 8 + (i % 10), Audiolibro: 5 + (i % 5) },
        format: isDigital ? "Digitale" : "Fisico",
        owned: !isLent,
        lent: isLent,
        expireDate,
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
                            <div key={book.id} className="relative">
                                <BookCard book={book} />

                                {isExpiring && (
                                    <div className="absolute top-2 left-2 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded shadow text-gray-700">
                                        <Clock className="h-3 w-3" />
                                        {getRemainingDays(book.expireDate)} days
                                    </div>
                                )}

                                {book.format === "Digitale" && (
                                    <div className="absolute top-2 right-2">
                                        <BookOpen className="h-5 w-5 text-gray-600" />
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