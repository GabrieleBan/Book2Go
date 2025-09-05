import AppHeader from "@/components/AppHeader.jsx";
import Category from "@/classes/Category.js"
import {Card} from "@/components/ui/card.js";
import CategoryItem from "@/components/category-item.jsx";
export default function CategoriesPage(){
    // Generate 100 sample categories
    const categoriesList = Array.from({ length: 100 }, (_, i) => {
        return new Category(
            i.toString(),
            `Category ${i + 1}`,
            `This is a description for Category ${i + 1}.`
        );

    });
     const devideList=(categoryList)=>{
         const size = Math.ceil(categoryList.length / 3);
         const list1 = categoryList.slice(0, size);
         const list2 = categoryList.slice(size, size * 2);
         const list3 = categoryList.slice(size * 2);
         return [list1, list2, list3];
    }

    const list_of_divided_lists = devideList(categoriesList);
    return <div className="py-10 ">
        <AppHeader></AppHeader>
        <div className="flex w-screen items-start justify-center gap-4">
            {list_of_divided_lists.map((list, idx) => (
                <Card key={idx} className="flex flex-col p-4 gap-2">
                    {list.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </Card>
            ))}
        </div>
    </div>
}