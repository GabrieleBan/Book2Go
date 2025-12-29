import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SearchableTags({ tags, selectedTags, setSelectedTags, maxVisible = 6 }) {
    const [search, setSearch] = useState("");

    // Filtra i tag in base alla barra di ricerca
    const visibleTags = tags
        .filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, maxVisible);

    // Controlla se un tag è selezionato
    const isSelected = (tag) => selectedTags.some(t => t.id === tag.id);

    // Toggle selezione tag
    const toggleTag = (tag, checked) => {
        if (checked) {
            setSelectedTags(prev => [...prev, tag]);
        } else {
            setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Input
                placeholder="Search tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-2"
            />

            {visibleTags.map(tag => (
                <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                        id={`tag-${tag.id}`}
                        checked={isSelected(tag)}
                        onCheckedChange={(checked) => toggleTag(tag, checked)}
                        className="w-4 h-4 border rounded border-gray-300 bg-white ui-checked:bg-blue-500 ui-checked:border-blue-500 flex items-center justify-center"
                    >
                        {isSelected(tag) && (
                            <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M5 13l4 4L19 7"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </Checkbox>
                    <label htmlFor={`tag-${tag.id}`} className="cursor-pointer">
                        {tag.name}
                    </label>
                </div>
            ))}
        </div>
    );
}