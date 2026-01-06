import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { Context } from "@/components/context-provider.jsx";
import AddBookModal from "@/components/AddBook.jsx";
import CatalogPage from "@/pages/catalog-page.jsx";

export default function StaffCatalogPage() {
    const navigate = useNavigate();
    const { user } = Context();
    const isAdmin = user?.roles?.includes("ADMIN");

    // Modal Aggiungi Libro
    const [modalOpen, setModalOpen] = useState(false);

    // Box Extra Actions (a destra)
    const extraActionsSidebar = (
        <div className="flex flex-col gap-2">
            {isAdmin && (
                <Button onClick={() => setModalOpen(true)}>
                    Aggiungi Libro
                </Button>
            )}
            {isAdmin && (
                <Button onClick={() => navigate("/staff/import-books")}>
                    Importa Libri
                </Button>
            )}
            {/* altri bottoni staff/admin qui */}
        </div>
    );

    return (
        <>
            <CatalogPage extraActionsSidebar={extraActionsSidebar} />
            <AddBookModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}