import Category from "@/classes/Category.js";
import {Card} from "@/components/ui/card";
export default function CategoryItem({ category}) {
    return (
        <div className="w-full max-w-xs mx-auto">
            <h1 className="text-lg font-bold text-center line-clamp-2">
                {category.name}
            </h1>
            <p className="text-sm text-center text-gray-600 line-clamp-2">
                {category.description}
            </p>
        </div>
    );
}