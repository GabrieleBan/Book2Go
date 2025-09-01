import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from "@/components/auth-provider.jsx";
import CatalogPage from "@/pages/catalog-page.jsx";
import ProfilePage from "@/pages/profilepage.jsx";
import LibraryPage from "@/pages/personal-library.jsx";
import PersonalHistory from "@/pages/personal-history.jsx";
import AppHeader from "@/components/AppHeader.jsx";
import BookPage from "@/pages/book-page.jsx";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppHeader avatarSrc="/src/assets/default-avatar.png"/>
                <Routes>
                    <Route path="/catalog-page" element={<CatalogPage/>}/>
                    <Route path="/" element={<ProfilePage/>}/>
                    <Route path="/personal-library" element={<LibraryPage/>}/>
                    <Route path="/personal-history" element={<PersonalHistory/>}/>
                    {/*<Route path="/" element={<BookPage/>}/>*/}
                </Routes>
            </Router>
        </AuthProvider>
    );
}