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
import BookSummary from "@/classes/BookSummary.js";
import Tag from "@/classes/Tag.js";
import SearchableTags from "@/components/searchable-tags.jsx";
import {Card} from "@/components/ui/card.js";
import { useSearchParams} from "react-router-dom";

export default function CatalogPage({ initialSelectedTags = [] }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsArray, setTagsArray] = useState([]);
    const [books, setBooks] = useState([]);
    const [searchParams] = useSearchParams();
    const searchBarInput = searchParams.get("name") || "";

    console.log("search bar", searchBarInput);
    const [name, setName]= useState(searchBarInput)
    useEffect(() => {
        setName(searchBarInput);
    }, [searchBarInput]);
    // Carica i tag all'avvio
    useEffect(() => {
        async function loadTags() {
            const tags = await Tag.fetchAll();
            setTagsArray(tags);

            if (initialSelectedTags.length === 0) return;

            // Normalizza tutto in oggetti {id, name}
            const normalized = initialSelectedTags
                .map(sel => {
                    if (typeof sel === "object" && sel.id && sel.name) return sel;
                    const match = tags.find(t => t.id === sel || t.name === sel);
                    return match ? { id: match.id, name: match.name } : null;
                })
                .filter(Boolean);

            setSelectedTags(normalized);
        }

        loadTags();
    }, []);

    // Carica i libri all'avvio o quando cambiano i tag selezionati
    useEffect(() => {
        async function loadBooks() {
            const categoryIds = selectedTags.map(t => t.id);
            console.log("Caricamento libri con categoryIds:", categoryIds); // <-- debug
            const fetchedBooks = await BookSummary.fetchAll(name, categoryIds);
            console.log("Libri fetchati:", fetchedBooks); // <-- debug
            setBooks(fetchedBooks);
        }
        loadBooks();
    }, [name,selectedTags]);

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
            if (window.innerWidth < 640) setColumns(2);
            else if (window.innerWidth < 768) setColumns(3);
            else if (window.innerWidth < 1024) setColumns(4);
            else setColumns(5);
        }
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    const showCount = columns * 4;

    // Filtered + sorted books
    const filteredBooks = useMemo(() => {
        let result = books.filter((b) => {
            const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.some((tag) => b.tags.includes(tag.name));

            const matchesFormat =
                selectedFormat.length === 0 ||
                selectedFormat.some((format) => b.prices[format] != null);

            const bookMinPrice = Math.min(...Object.values(b.prices).filter((p) => p !== null));
            const bookMaxPrice = Math.max(...Object.values(b.prices).filter((p) => p !== null));
            const matchesPrice = bookMinPrice <= priceRange[1] && bookMaxPrice >= priceRange[0];

            return matchesSearch && matchesTags && matchesFormat && matchesPrice;
        });

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

    const totalPages = Math.ceil(filteredBooks.length / showCount);
    const paginatedBooks = filteredBooks.slice((page - 1) * showCount, page * showCount);
    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };
    return (
        <div className="w-screen bg-white flex flex-col">
            <AppHeader />
            <div className="flex flex-wrap gap-2 mb-6">
                {/* Nome della ricerca */}
                {name && (
                    <Card
                        key="search-name"
                        className="px-3 py-1 cursor-pointer bg-[#F5E7D2] text-black font-semibold"
                        onClick={() => {
                            setName("")
                        }}
                    >
                        "{name}"
                    </Card>
                )}

                {/* Tags selezionati */}
                {selectedTags.map((tag) => (
                    <Card
                        key={tag.id} // id unico
                        className="px-3 py-1 cursor-pointer bg-[#F5E7D2] text-black"
                        onClick={() =>
                            setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id)) // Rimuove il tag cliccato
                        }
                    >
                        {tag.name}
                    </Card>
                ))}
            </div>

            <main className="flex flex-1 px-4 md:px-8 py-6 gap-6">
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
                                    setSelectedFormat((prev) =>
                                        checked ? [...prev, format] : prev.filter((f) => f !== format)
                                    );
                                }}
                            />
                            <label htmlFor={format}>{format}</label>
                        </div>
                    ))}

                    <h3 className="font-semibold mt-4 mb-2">Prezzo</h3>
                    <Slider
                        min={0}
                        max={1000}
                        step={1}
                        defaultValue={priceRange}
                        onValueChange={(val) => setPriceRange(val)}
                    />
                    <p className="text-sm text-gray-600">
                        {priceRange[0]} € - {priceRange[1]} €
                    </p>
                </aside>

                <section className="flex-1 flex flex-col">
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

                    <div className="flex flex-wrap gap-8">
                        {paginatedBooks.map((book) => (
                            <div key={book.id} className="w-[180px]">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>

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