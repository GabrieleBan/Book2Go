import { Card } from "@/components/ui/card";
// ---------- BookCard Component ----------

export default function BookCard({ book }) {
    return (
        <Card className="p-2 flex flex-col items-center justify-between">
            <div className="relative w-full h-40 bg-purple-50 rounded-md flex items-center justify-center overflow-hidden">
                {book.image ? (
                    <img
                        src={book.image}
                        alt={book.title}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-gray-400">No Cover</span>
                )}
            </div>
            <div className="mt-2 text-center">
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-yellow-500">{"★".repeat(book.rating)}</p>
                <p className="font-medium">{book.price} €</p>
            </div>
        </Card>
    );
}

