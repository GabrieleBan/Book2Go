import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/book-card.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useMemo } from "react";

export default function CatalogPage() {
    // Example books
    const [books] = useState([
        { id: 1, title: "Dante", author: "Alessandro Barbero", price: 33.5, rating: 5, format: "Fisico", tags: ["Storia", "Classico"], image: "/dante.jpg" },
        { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", price: 20, rating: 5, format: "Digitale", tags: ["Avventura", "Classico"] },
        { id: 3, title: "Sapiens", author: "Yuval Noah Harari", price: 25, rating: 4, format: "Audiolibro", tags: ["Storia"] },
        { id: 4, title: "Il Nome della Rosa", author: "Umberto Eco", price: 30, rating: 5, format: "Fisico", tags: ["Storia", "Mistero"] },
        { id: 5, title: "Dune", author: "Frank Herbert", price: 28, rating: 5, format: "Digitale", tags: ["Avventura", "Fantascienza"] },
        { id: 6, title: "Dune", author: "Frank Herbert", price: 28, rating: 5, format: "Digitale", tags: ["Avventura", "Fantascienza"] },
        { id: 7, title: "Dune", author: "Frank Herbert", price: 28, rating: 5, format: "Digitale", tags: ["Avventura", "Fantascienza"] },
        { id: 8, title: "Dune", author: "Frank Herbert", price: 28, rating: 5, format: "Digitale", tags: ["Avventura", "Fantascienza"] },
        { id: 9, title: "Dune", author: "Frank Herbert", price: 28, rating: 5, format: "Digitale", tags: ["Avventura", "Fantascienza"] },
    ]);

    // Filters
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortBy, setSortBy] = useState("recent");
    const [showMode, setShowMode] = useState("both"); // purchase | lending | both
    const [page, setPage] = useState(1);
    const [columns, setColumns] = useState(5);

    // Track responsive column count to enforce 4 rows max
    useEffect(() => {
        function updateColumns() {
            if (window.innerWidth < 640) setColumns(2); // sm
            else if (window.innerWidth < 768) setColumns(3); // md
            else if (window.innerWidth < 1024) setColumns(4); // lg
            else setColumns(5); // xl+
        }
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    const showCount = columns * 4; // always 4 rows max

    // Filtered + sorted books
    const filteredBooks = useMemo(() => {
        let result = books.filter(
            (b) =>
                b.title.toLowerCase().includes(search.toLowerCase()) &&
                (selectedTags.length === 0 || selectedTags.some((tag) => b.tags.includes(tag))) &&
                (selectedFormat.length === 0 || selectedFormat.includes(b.format)) &&
                b.price >= priceRange[0] &&
                b.price <= priceRange[1]
        );

        if (sortBy === "price-asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === "title") {
            result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [books, search, selectedTags, selectedFormat, priceRange, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredBooks.length / showCount);
    const paginatedBooks = filteredBooks.slice((page - 1) * showCount, page * showCount);

    return (
        <div className="w-screen bg-white flex flex-col">
            <AppHeader />

            <main className="flex flex-1 px-4 md:px-8 py-6 gap-6">
                {/* Sidebar filters */}
                <aside className="w-64 hidden md:block">
                    <h3 className="font-semibold mb-2">Tags</h3>
                    {["Avventura", "Storia", "Classico", "Fantascienza"].map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                                id={tag}
                                checked={selectedTags.includes(tag)}
                                onCheckedChange={(checked) => {
                                    setSelectedTags((prev) => (checked ? [...prev, tag] : prev.filter((t) => t !== tag)));
                                }}
                            />
                            <label htmlFor={tag}>{tag}</label>
                        </div>
                    ))}

                    <h3 className="font-semibold mt-4 mb-2">Formato</h3>
                    {["Fisico", "Digitale", "Audiolibro"].map((format) => (
                        <div key={format} className="flex items-center space-x-2">
                            <Checkbox
                                id={format}
                                checked={selectedFormat.includes(format)}
                                onCheckedChange={(checked) => {
                                    setSelectedFormat((prev) => (checked ? [...prev, format] : prev.filter((f) => f !== format)));
                                }}
                            />
                            <label htmlFor={format}>{format}</label>
                        </div>
                    ))}

                    <h3 className="font-semibold mt-4 mb-2">Prezzo</h3>
                    <Slider min={0} max={1000} step={1} defaultValue={priceRange} onValueChange={(val) => setPriceRange(val)} />
                    <p className="text-sm text-gray-600">
                        {priceRange[0]} € - {priceRange[1]} €
                    </p>
                </aside>

                {/* Main content */}
                <section className="flex-1 flex flex-col">
                    {/* Search + Sort/Show */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <Input
                            placeholder="Cerca..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm"
                        />

                        <div className="flex gap-4">
                            <Select defaultValue="recent" onValueChange={setSortBy}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Recently added</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Show mode instead of number */}
                            <Select defaultValue={showMode} onValueChange={setShowMode}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Show" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="purchase">Purchase</SelectItem>
                                    <SelectItem value="lending">Lending</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {paginatedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={() => setPage((p) => Math.max(1, p - 1))} />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink href="#" isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalPages > 5 && <PaginationEllipsis />}
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </section>
            </main>
        </div>
    );
}