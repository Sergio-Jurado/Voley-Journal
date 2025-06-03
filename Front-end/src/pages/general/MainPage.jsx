import { useEffect, useState } from "react";
import LeagueSearch from "../../components/LeagueSearch";
import LeagueCard from "../../components/LeagueCard";

const MainPage = () => {
    const [leagues, setLeagues] = useState([]);
    const [filteredLeagues, setFilteredLeagues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeagues = async () => {
        try {
            const response = await fetch("https://voley-journal.onrender.com/api/leagues/get");
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
                                <LeagueCard key={league._id} league={league} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MainPage;