import { useEffect, useState } from "react";
import LeagueSearch from "../../components/LeagueSearch";

const MainPage = () => {
    const [leagues, setLeagues] = useState([]); // Estado para almacenar todas las ligas
    const [filteredLeagues, setFilteredLeagues] = useState([]); // Estado para almacenar las ligas filtradas
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

    // Función para obtener las ligas desde el backend
    const fetchLeagues = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/leagues/get"); // Endpoint para obtener las ligas
            if (!response.ok) {
                throw new Error("Error al obtener las ligas");
            }
            const data = await response.json();
            setLeagues(data); // Guardar las ligas en el estado
            setFilteredLeagues(data); // Inicialmente, todas las ligas están visibles
        } catch (err) {
            console.error(err.message); // Manejar errores en la consola
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

    // Llamar a la función fetchLeagues cuando el componente se monte
    useEffect(() => {
        fetchLeagues();
    }, []);

    // Función para manejar el término de búsqueda
    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setFilteredLeagues(leagues); // Mostrar todas las ligas si no hay término de búsqueda
        } else {
            const filtered = leagues.filter((league) =>
                league.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLeagues(filtered);
        }
    };

    return (
        <>
            <LeagueSearch onSearch={handleSearch} />
            <div className="text-center p-2">
                <h1 className="text-3xl font-black">Ligas</h1>
                <div className="min-h-screen p-8">
                    {loading ? (
                        <p className="text-gray-500 text-lg">Cargando ligas...</p>
                    ) : filteredLeagues.length === 0 ? (
                        <p className="text-gray-500 text-lg">No se han encontrado ninguna liga</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredLeagues.map((league) => (
                                <div
                                    key={league._id}
                                    className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
                                >
                                    <img
                                        src={`http://localhost:5000/media/${league.logo}`}
                                        alt={league.name}
                                        className="w-24 h-24 object-cover rounded-full mb-4"
                                    />
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {league.name}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MainPage;