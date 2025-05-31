import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const PublicLayaout = () => {
    return (
        <>
            <Header />
            <main className="p-4">
                <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
            </main>
        </>

    );
}

export default PublicLayaout