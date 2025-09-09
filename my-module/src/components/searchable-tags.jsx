import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SearchableTags({ tags, selectedTags, setSelectedTags, maxVisible = 6 }) {
    const [search, setSearch] = useState("");

    // Filter tags based on search input
    const visibleTags = tags
        .filter((tag) => tag.toLowerCase().includes(search.toLowerCase()))
        .slice(0, maxVisible);

    return (
        <div className="flex flex-col">


            {visibleTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) =>
                            setSelectedTags((prev) =>
                                checked ? [...prev, tag] : prev.filter((t) => t !== tag)
                            )
                        }
                    />
                    <label htmlFor={tag}>{tag}</label>
                </div>
            ))}

            <Input
                placeholder="Search tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-2 my-2"
            />
        </div>
    );
}