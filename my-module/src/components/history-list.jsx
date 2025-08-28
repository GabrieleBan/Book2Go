// components/HistoryList.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {HistoryItem} from "@/components/history-item.jsx";
// Test example data with extra fields

const testEntries = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Entry ${i + 1}`,
    date: new Date(2025, 7, i + 1).toLocaleDateString(),
    description: `This is a test description for entry ${i + 1}.`,
    notes: `Extra notes for entry ${i + 1}`,
    category: i % 2 === 0 ? "Work" : "Personal",
}));
export function HistoryList({ itemsPerPage = 5 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(testEntries.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = testEntries.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-col h-full">
            {/* List of items */}
            <div className="flex-1 overflow-y-auto w-full">
                {currentItems.map((entry) => (
                    <HistoryItem key={entry.id} entry={entry} height="100px" />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className="flex items-center px-2">
          Page {currentPage} of {totalPages}
        </span>
                <Button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}