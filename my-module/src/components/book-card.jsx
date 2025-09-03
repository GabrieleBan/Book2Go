import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider.jsx";
import { useNavigate } from "react-router-dom";
import Book from "@/classes/Book.js";

export default function BookCard({ book }) {
    const { rememberBook } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        rememberBook(book);
        navigate("/book");
    };

    return (
        <Card className="p-2 flex flex-col items-center justify-between cursor-pointer" onClick={handleClick}>
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
                <p className="text-yellow-500">{book.getStars()}</p>
                <p className="font-medium">{book.getPrice("Fisico")} €</p>
            </div>
        </Card>
    );
}