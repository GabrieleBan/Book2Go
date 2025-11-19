import { Card } from "@/components/ui/card";
import { Context } from "@/components/context-provider.jsx";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
    const { rememberBook } = Context();
    const navigate = useNavigate();

    const handleClick = () => {
        rememberBook(book);
        window.scrollTo(0, 0);
        navigate("/book");
    };

    return (
        <Card
            className="p-2 flex border-2 border-[#6E3517] w-48 aspect-[3/5] flex-col items-center justify-between cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative w-full h-40 bg-purple-50 rounded-md flex items-center justify-center overflow-hidden">
                <img
                    src={book.image ?? book.coverImageUrl ?? "/placeholder-book.jpg"}
                    alt={book.title ?? "Untitled"}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="mt-2 text-center">
                <p className="font-medium">{book.title ?? "Untitled"}</p>
                <p className="text-sm text-gray-600">{book.author ?? "Unknown"}</p>
                <p className="text-yellow-500">{book.getStars()}</p>
                <p className="font-medium">{book.getPrice("Fisico")} €</p>
            </div>
        </Card>
    );
}