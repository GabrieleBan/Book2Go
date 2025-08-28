import AppHeader from "@/components/AppHeader";
import {Card} from "@/components/ui/card.js";
import {HistoryList} from "@/components/history-list.jsx";
export default function PersonalHistory() {
    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-beige-100 flex flex-col">
            <AppHeader />
            <div className="h-5"></div>

            <h1 className="text-3xl ml-5 font-bold text-gray-700">
                Storico personale
            </h1>

            <main className="flex-1 flex justify-center ">
                <Card className="w-full max-w-[95vw] h-full p-6">
                    <HistoryList  itemsPerPage={5} />
                </Card>
            </main>
        </div>
    );
}