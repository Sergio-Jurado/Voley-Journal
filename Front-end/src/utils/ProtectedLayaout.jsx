import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Header } from "../components/Header";

const ProtectedLayout = () => {
    return (
        <ProtectedRoute>
            <Header />
            <main className="p-4">
                <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
            </main>
        </ProtectedRoute>
    );
};

export default ProtectedLayout;