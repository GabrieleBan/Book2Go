import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import {useAuth} from "@/components/auth-provider.jsx";

import ProfileActions from "@/components/profile-actions";
import AppHeader from "@/components/AppHeader";

import User from "@/classes/User.js";
export default function ProfilePage() {
    let { user } = useAuth();

    // If not logged in
    if (!user) {
        user = new User({
            name: "Mario",
            surname: "Rossi",
            email: "mario.rossi@example.com",
            number: "+39 333 1234567",
        });
    }//return <p className="p-4">Please log in to view your profile.</p>;


    return (
        <div className=" w-screen bg-beige-100 flex flex-col">
            <AppHeader />

            {/* Main Content */}
            <main className="flex-1 flex items-stretch px-2 md:px-4 py-6">
                <Card className="flex-1 p-8 flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div>
                        <img
                            src={user.avatar || "/user-avatar.png"}
                            alt={user.name + " " + user.surname}
                            className="h-40 w-40 rounded-full object-cover"
                        />
                        <Edit className="relative right-0 h-8 w-8 bg-white rounded-full p-1 cursor-pointer" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex-row">
                            <h2 className="text-4xl font-semibold">
                                {user.name} {user.surname}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Email: <span className="font-medium">{user.email}</span>
                            </p>
                            <p className="text-gray-600 mt-1">
                                Telefono: <span className="font-medium">{user.number}</span>
                            </p>
                        </div>

                        <div className="mt-6 md:mt-0 flex-1">
                            <Textarea
                                placeholder="Bio..."
                                value={user.bio || ""}
                                className="w-full h-[20vh]"
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                Libri letti: <span className="font-medium">{user.bookcount || 0}</span>{" "}
                                &nbsp;|&nbsp; Karma: <span className="font-medium">{user.karma || 0}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <ProfileActions />
                    </div>

                    {/* Tier Badge */}
                    <div className="hidden max-h-[10vh] md:flex items-center justify-center bg-green-100 p-8 rounded-lg text-center">
            <span className="font-medium text-lg">
              {user.tier ? `Tier ${user.tier} Icon` : "Tier 1 Icon"}
            </span>
                    </div>
                </Card>
            </main>
        </div>
    );
}