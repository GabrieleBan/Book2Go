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
import {Button} from "@/components/ui/button.js";



export default function CatalogPage({ initialSelectedTags = [] }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsArray, setTagsArray] = useState([]);
    const [books, setBooks] = useState([]);

    const [searchParams] = useSearchParams();
    const searchBarInput = searchParams.get("name") || "";

    const [name, setName] = useState(searchBarInput);
    const [search, setSearch] = useState(searchBarInput);

    const [selectedFormat, setSelectedFormat] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortBy, setSortBy] = useState("title");
    const [showMode, setShowMode] = useState("both");

    const [page, setPage] = useState(0);
    const [columns, setColumns] = useState(5);

    // sync query param
    useEffect(() => {
        setName(searchBarInput);
        setSearch(searchBarInput);
    }, [searchBarInput]);

    // carica tag
    useEffect(() => {
        async function loadTags() {
            const tags = await Tag.fetchAll();
            setTagsArray(tags);

            if (initialSelectedTags.length === 0) return;

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
    useEffect(() => {
        handleSearch(0);
    },[]);

    // responsive columns
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


    const handleSearch = async (newPage = 0) => {
        const categoryIds = selectedTags.map(t => t.id);

        const fetchedBooks = await BookSummary.fetchAll({
            title: search || name,
            categoryIds,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            sort:
                sortBy === "price-asc"
                    ? "price,asc"
                    : sortBy === "price-desc"
                        ? "price,desc"
                        : "title,asc",
            page: newPage,
            size: showCount
        });

        setPage(newPage);
        setBooks(fetchedBooks);
    };

    return (
        <div className="w-screen bg-white flex flex-col">
            <AppHeader />

            {/* TAG SELEZIONATI */}
            <div className="flex flex-wrap gap-2 mb-6 px-4 md:px-8">
                {name && (
                    <Card
                        className="px-3 py-1 cursor-pointer bg-[#F5E7D2] font-semibold"
                        onClick={() => {
                            setName("");
                            setSearch("");
                        }}
                    >
                        "{name}"
                    </Card>
                )}

                {selectedTags.map(tag => (
                    <Card
                        key={tag.id}
                        className="px-3 py-1 cursor-pointer bg-[#F5E7D2]"
                        onClick={() =>
                            setSelectedTags(prev => prev.filter(t => t.id !== tag.id))
                        }
                    >
                        {tag.name}
                    </Card>
                ))}
            </div>

            <main className="flex flex-1 px-4 md:px-8 py-6 gap-6">
                {/* SIDEBAR */}
                <aside className="max-w-64">
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <SearchableTags
                        tags={tagsArray}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        maxVisible={6}
                    />

                    <h3 className="font-semibold mt-4 mb-2">Formato</h3>
                    {["Fisico", "Digitale", "Audiolibro"].map(format => (
                        <div key={format} className="flex items-center space-x-2">
                            <Checkbox
                                checked={selectedFormat.includes(format)}
                                onCheckedChange={(checked) =>
                                    setSelectedFormat(prev =>
                                        checked
                                            ? [...prev, format]
                                            : prev.filter(f => f !== format)
                                    )
                                }
                                className="
                                border-gray-400
                                data-[state=checked]:bg-black
                                data-[state=checked]:text-white
                                data-[state=checked]:border-black
            "
                            />
                            <label className="text-black">{format}</label>
                        </div>
                    ))}

                    <h3 className="font-semibold mt-4 mb-2">Prezzo</h3>
                    <Slider
                        min={0}
                        max={1000}
                        step={1}
                        defaultValue={priceRange}
                        onValueChange={setPriceRange}
                    />
                    <p className="text-sm text-gray-600">
                        {priceRange[0]} € - {priceRange[1]} €
                    </p>
                </aside>

                {/* CONTENT */}
                <section className="flex-1 flex flex-col">
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Cerca..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="max-w-sm"
                            />
                            <Button onClick={() => handleSearch(0)}>Cerca</Button>
                        </div>

                        <div className="flex gap-4">
                            <Select defaultValue="title" onValueChange={setSortBy}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
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
                        {books.map(book => (
                            <div key={book.id} className="w-[180px]">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>

                    {/* PAGINAZIONE BACKEND */}
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => handleSearch(Math.max(0, page - 1))}
                                    />
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() => handleSearch(page + 1)}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </section>
            </main>
        </div>
    );
}