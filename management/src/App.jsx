import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Context, ContextProvider} from "@/components/context-provider.jsx";
import StaffLoggingPage from "@/pages/StaffLoggingPage.jsx";
import DashboardPage from "@/pages/dashboard-page.jsx";
import LendPage from "@/pages/lend-management-page.jsx";

import { Navigate } from "react-router-dom";
import StaffLendingActionsPage from "@/pages/StaffLendingActionPage.jsx";
import LendableBooksPage from "@/pages/LendableBooksPage.jsx";
import StaffCatalogPage from "@/pages/StaffCatalogPage.jsx";
import BookPage from "@/pages/book-page.jsx";
import InventoryManagePage from "@/pages/InventoryManagePage.jsx";

function ProtectedRoute({ children }) {
    const { user } = Context();
    if (!user) return <Navigate to="/" replace />; // redirect al login se non loggato
    return children;
}



export default function App() {
    return (
        <ContextProvider>
            <Router>

                <Routes>
                    <Route path="/" element={<StaffLoggingPage/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/inventory/manage/:formatId"
                        element={
                            <ProtectedRoute>
                                <InventoryManagePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/inventory/manage/"
                        element={
                            <ProtectedRoute>
                                <InventoryManagePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/lends"
                        element={
                            <ProtectedRoute>
                                <LendPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff-lending-actions"
                        element={
                            <ProtectedRoute>
                                <StaffLendingActionsPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/lendable-books"
                        element={
                            <ProtectedRoute>
                                <LendableBooksPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/catalog"
                        element={
                            <ProtectedRoute>
                                <StaffCatalogPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/book"
                        element={
                            <ProtectedRoute>
                                <BookPage />
                            </ProtectedRoute>
                        }
                    />



                </Routes>
            </Router>
        </ContextProvider>
    );
}