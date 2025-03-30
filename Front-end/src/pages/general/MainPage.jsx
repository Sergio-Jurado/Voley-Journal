import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueSearch from "../../components/LeagueSearch";

const MainPage = () => {
    const [leagues, setLeagues] = useState([]);
    const [filteredLeagues, setFilteredLeagues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeagues = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/leagues/get");
            if (!response.ok) {
                throw new Error("Error al obtener las ligas");
            }
            const data = await response.json();
            setLeagues(data);
            setFilteredLeagues(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeagues();
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setFilteredLeagues(leagues);
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
                                    <Link
                                        to={`/showLeague/${league._id}`}
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                                    >
                                        Ver Liga
                                    </Link>
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