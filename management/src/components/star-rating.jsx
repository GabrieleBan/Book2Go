import { Star } from "lucide-react";

// ---------- Star Rating Component ----------


function StarRating({ value, onChange, size = 20 }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={size}
                    className={`cursor-pointer ${
                        i <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => onChange && onChange(i)}
                />
            ))}
        </div>
    );
}

export default StarRating;