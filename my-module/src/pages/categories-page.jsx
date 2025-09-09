import AppHeader from "@/components/AppHeader.jsx";
import Category from "@/classes/Category.js"

import {Card} from "@/components/ui/card.js";
import CategoryItem from "@/components/category-item.jsx";
import {useEffect, useState} from "react";
export default function CategoriesPage(){
    const [listOfLists, setListOfLists] = useState([]);
    const [lastDiv, setLastDiv] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    // Generate 100 sample categories
    const categoriesList = Array.from({ length: 100 }, (_, i) => {
        return new Category(
            i.toString(),
            `Category ${i + 1}`,
            `This is a description for Category ${i + 1}.`
        );
    });

    // Track window width
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Recompute divided list whenever width or categoriesList changes
    useEffect(() => {
        let divisions = 3;
        if (width < 954) divisions = width < 706 ? 1 : 2;

        if (lastDiv === divisions) return; // no change

        const tot = categoriesList.length;
        const size = Math.ceil(tot / divisions);

        const newListOfLists = [];
        for (let i = 0; i < tot; i += size) {
            newListOfLists.push(categoriesList.slice(i, i + size));
        }

        setListOfLists(newListOfLists);
        setLastDiv(divisions);
    }, [width, categoriesList, lastDiv]);





    return <div className="py-10 w-screen ">
        <AppHeader></AppHeader>

        <div className="flex max-w-[100vw] gap-8 items-center justify-center ">
            <div className="flex flex-1  m-10   justify-center gap-10">
                {listOfLists.map((list, idx) => (
                    <Card key={idx} className="flex  flex-1 flex-col p-4 gap-2">
                        {list.map((category) => (
                            <CategoryItem  key={category.id} category={category}  />
                        ))}
                    </Card>
                ))}
            </div>
        </div>
    </div>
}