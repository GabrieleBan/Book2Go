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
import Book from "@/classes/Book.js";
import SearchableTags from "@/components/searchable-tags.jsx";

export default function CatalogPage() {
    // Example books
    const tagsArray = [
        "Avventura",
        "Storia",
        "Classico",
        "Fantascienza",
        "Romantico",
        "Horror",
        "Thriller",
    ];

    const [selectedTags, setSelectedTags] = useState([]);

    const books = [
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
        })
    ];

    // Filters
    const [search, setSearch] = useState("");

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
        let result = books.filter((b) => {


            const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());

            // Filter by tags
            const matchesTags = selectedTags.length === 0 || (b.tags && selectedTags.some((tag) => b.tags.includes(tag)));

            // Filter by format
            const matchesFormat =
                selectedFormat.length === 0 ||
                selectedFormat.some((format) => b.prices[format] != null);

            // Filter by price
            const bookMinPrice = Math.min(...Object.values(b.prices).filter((p) => p !== null));
            const bookMaxPrice = Math.max(...Object.values(b.prices).filter((p) => p !== null));
            const matchesPrice = bookMinPrice <= priceRange[1] && bookMaxPrice >= priceRange[0];

            return matchesSearch && matchesTags && matchesFormat && matchesPrice;
        });

        // Sorting
        if (sortBy === "price-asc") {
            result = [...result].sort((a, b) => {
                const aMin = Math.min(...Object.values(a.prices).filter((p) => p !== null));
                const bMin = Math.min(...Object.values(b.prices).filter((p) => p !== null));
                return aMin - bMin;
            });
        } else if (sortBy === "price-desc") {
            result = [...result].sort((a, b) => {
                const aMax = Math.max(...Object.values(a.prices).filter((p) => p !== null));
                const bMax = Math.max(...Object.values(b.prices).filter((p) => p !== null));
                return bMax - aMax;
            });
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
                <aside className="max-w-64 ">


                        <h3 className="font-semibold mb-2">Tags</h3>
                        <SearchableTags
                            tags={tagsArray}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            maxVisible={6}
                        />


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
                    {/* Griglia libri */}
                    <div className="flex flex-wrap  gap-8">
                        {paginatedBooks.map((book) => (
                            <div key={book.id} className="w-[180px]">
                                <BookCard book={book} />
                            </div>
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