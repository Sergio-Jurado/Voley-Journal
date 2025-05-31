import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowLeague = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagueData = async () => {
            try {
                const leagueResponse = await fetch(`http://localhost:5000/api/leagues/getby/${id}`);
                if (!leagueResponse.ok) {
                    throw new Error("Error al obtener los datos de la liga");
                }
                const leagueData = await leagueResponse.json();
                setLeague(leagueData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagueData();
    }, [id]);

    if (loading) {
        return <p className="text-gray-500 text-lg text-center">Cargando datos de la liga...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg text-center">{error}</p>;
    }

    return (
        <div className="max-w-12xl mx-auto p-10 bg-gradient-to-br from-blue-100 to-blue-200 shadow-2xl rounded-2xl mt-12 border border-blue-200">
            <div className="flex flex-col items-center mb-8">
                {league?.logo && (
                    <div className="w-40 h-40 rounded-full bg-white shadow-lg border-4 border-blue-300 flex items-center justify-center mb-4">
                        <img
                            src={`http://localhost:5000/media/${league.logo}`}
                            alt={league.name}
                            className="w-36 h-36 object-cover rounded-full"
                        />
                    </div>
                )}
                <h1 className="text-5xl font-extrabold text-blue-800 mb-2 drop-shadow text-center">
                    {league?.name}
                </h1>
                <div className="w-24 h-1 bg-blue-400 rounded-full mt-2 mb-2"></div>
            </div>
        </div>
    );
};

export default ShowLeague;