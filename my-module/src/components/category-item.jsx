import Category from "@/classes/Category.js";
import {Card} from "@/components/ui/card";
export default function CategoryItem( {category}){
    return (
        <div className="">
            <h1 className="text-lg font-bold">{category.name}</h1>
            <p className="text-sm text-gray-600">{category.description}</p>
        </div>
    );
}