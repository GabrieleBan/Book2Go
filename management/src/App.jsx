import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Context, ContextProvider} from "@/components/context-provider.jsx";
import StaffLoggingPage from "@/pages/StaffLoggingPage.jsx";
import DashboardPage from "@/pages/dashboard-page.jsx";
import LendPage from "@/pages/lend-management-page.jsx";

import { Navigate } from "react-router-dom";

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
                        path="/lends"
                        element={
                            <ProtectedRoute>
                                <LendPage />
                            </ProtectedRoute>
                        }
                    />


                </Routes>
            </Router>
        </ContextProvider>
    );
}