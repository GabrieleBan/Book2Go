import AppHeader from "@/components/AppHeader";

export default function PersonalHistory() {
    return (
        <div className="min-h-screen w-screen bg-beige-100 flex flex-col">
            <AppHeader />

            <main className="flex-1 flex items-center justify-center p-6">
                <h1 className="text-3xl font-bold text-gray-700">Storico personale</h1>
            </main>
        </div>
    );
}