import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ProfileActions() {
    return (
        <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link to="/personal-library" className="flex-1">
                <Button className="w-full">La tua libreria</Button>
            </Link>

            <Link to="/personal-history" className="flex-1">
                <Button className="w-full">Storico</Button>
            </Link>
        </div>
    );
}