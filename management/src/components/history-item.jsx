import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
export function HistoryItem({ entry }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* The clickable card */}
            <div
                className="p-4 border rounded-md mb-2 bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setOpen(true)}
            >
                <h3 className="font-bold text-lg">{entry.title}</h3>
                <p className="text-gray-600">{entry.date}</p>
                <p className="text-gray-800">{entry.description}</p>
            </div>

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{entry.title}</DialogTitle>
                        <DialogDescription>
                            Detailed information for this entry.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Extra fields not shown in the card */}
                    <div className="mt-4 space-y-2">
                        <p>
                            <strong>Date:</strong> {entry.date}
                        </p>
                        <p>
                            <strong>Description:</strong> {entry.description}
                        </p>
                        <p>
                            <strong>Notes:</strong> {entry.notes || "No extra notes."}
                        </p>
                        <p>
                            <strong>Category:</strong> {entry.category || "General"}
                        </p>
                    </div>

                    <div className="mt-6 text-right">
                        <DialogClose asChild>
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                Close
                            </button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

