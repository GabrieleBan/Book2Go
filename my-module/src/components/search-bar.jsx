"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input.js";

import { useSearchParams } from "react-router-dom";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            setSearchParams({ name: query.trim() });
            navigate("/catalog?name=" + encodeURIComponent(query.trim()));
        }
    };

    return (
        <Input
            placeholder="Cerca tra milioni di libri"
            className="w-[45vw] rounded-lg bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
}