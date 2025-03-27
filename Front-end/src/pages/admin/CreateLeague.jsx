import { useState } from 'react';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueLogo, setLeagueLogo] = useState(null);
    const [teams, setTeams] = useState([{ name: '', logo: null }]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAddTeam = () => {
        setTeams([...teams, { name: '', logo: null }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Subir la liga
            const leagueFormData = new FormData();
            leagueFormData.append('name', leagueName);
            leagueFormData.append('leagueLogo', leagueLogo);

            const leagueResponse = await fetch('/api/leagues', {
                method: 'POST',
                body: leagueFormData,
            });

            if (!leagueResponse.ok) {
                throw new Error('Error al crear la liga');
            }

            const leagueData = await leagueResponse.json();

            // Subir los equipos
            for (const team of teams) {
                const teamFormData = new FormData();
                teamFormData.append('name', team.name);
                teamFormData.append('teamLogo', team.logo);

                const teamResponse = await fetch(`/api/leagues/${leagueData.league._id}/teams`, {
                    method: 'POST',
                    body: teamFormData,
                });

                if (!teamResponse.ok) {
                    throw new Error('Error al añadir un equipo');
                }
            }

            setSuccess('Liga creada exitosamente');
            setLeagueName('');
            setLeagueLogo(null);
            setTeams([{ name: '', logo: null }]);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crear Liga</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre de la Liga</label>
                    <input
                        type="text"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Logo de la Liga</label>
                    <input
                        type="file"
                        onChange={(e) => setLeagueLogo(e.target.files[0])}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {teams.map((team, teamIndex) => (
                    <div key={teamIndex} className="mb-4 p-4 border border-gray-300 rounded">
                        <h2 className="text-xl font-bold mb-2">Equipo {teamIndex + 1}</h2>
                        <div className="mb-2">
                            <label className="block text-gray-700">Nombre del Equipo</label>
                            <input
                                type="text"
                                value={team.name}
                                onChange={(e) => {
                                    const newTeams = [...teams];
                                    newTeams[teamIndex].name = e.target.value;
                                    setTeams(newTeams);
                                }}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Logo del Equipo</label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const newTeams = [...teams];
                                    newTeams[teamIndex].logo = e.target.files[0];
                                    setTeams(newTeams);
                                }}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTeam}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mb-4"
                >
                    Añadir Equipo
                </button>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Crear Liga
                </button>
            </form>
        </div>
    );
};

export default CreateLeague;