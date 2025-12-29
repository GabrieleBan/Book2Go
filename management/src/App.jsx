import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ContextProvider} from "@/components/context-provider.jsx";
import CatalogPage from "@/pages/catalog-page.jsx";
import StaffLoggingPage from "@/pages/StaffLoggingPage.jsx";








export default function App() {
    return (
        <ContextProvider>
            <Router>

                <Routes>
                    <Route path="/" element={<StaffLoggingPage/>}/>


                </Routes>
            </Router>
        </ContextProvider>
    );
}