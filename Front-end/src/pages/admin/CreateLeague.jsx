import { useState } from 'react';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueLogo, setLeagueLogo] = useState(null);
    const [leagueLogoPreview, setLeagueLogoPreview] = useState(null); // Para la vista previa del logo
    const [teams, setTeams] = useState([{ name: '', logo: null }]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAddTeam = () => {
        if (teams.length >= 12) {
            setError('No puedes añadir más de 12 equipos');
            return;
        }
        setTeams([...teams, { name: '', logo: null }]);
    };

    const handleLeagueLogoChange = (e) => {
        const file = e.target.files[0];
        setLeagueLogo(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLeagueLogoPreview(reader.result); // Generar la vista previa
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (!leagueName || !leagueLogo) {
                throw new Error('El nombre y el logo de la liga son obligatorios');
            }

            const leagueFormData = new FormData();
            leagueFormData.append('name', leagueName);
            leagueFormData.append('leagueLogo', leagueLogo);

            const leagueResponse = await fetch('http://localhost:5000/api/leagues/create', {
                method: 'POST',
                body: leagueFormData,
            });

            if (!leagueResponse.ok) {
                throw new Error('Error al crear la liga');
            }

            const leagueData = await leagueResponse.json();
            const leagueId = leagueData.league._id;

            for (const team of teams) {
                if (!team.name || !team.logo) {
                    throw new Error('Todos los equipos deben tener un nombre y un logo');
                }

                const teamFormData = new FormData();
                teamFormData.append('name', team.name);
                teamFormData.append('teamLogo', team.logo);
                teamFormData.append('idLeague', leagueId);

                const teamResponse = await fetch(`http://localhost:5000/api/teams/create`, {
                    method: 'POST',
                    body: teamFormData,
                });

                if (!teamResponse.ok) {
                    throw new Error('Error al añadir un equipo');
                }
            }

            setSuccess('Liga y equipos creados exitosamente');
            setLeagueName('');
            setLeagueLogo(null);
            setLeagueLogoPreview(null); // Limpiar la vista previa
            setTeams([{ name: '', logo: null }]);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-300 flex items-center justify-center">
            <div className="p-10 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Crear Liga</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Nombre de la Liga</label>
                        <input
                            type="text"
                            value={leagueName}
                            onChange={(e) => setLeagueName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el nombre de la liga"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Logo de la Liga</label>
                        <input
                            type="file"
                            onChange={handleLeagueLogoChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vista Previa</h2>
                        <div className="flex items-center space-x-4">
                            {leagueLogoPreview && (
                                <img
                                    src={leagueLogoPreview}
                                    alt="Vista previa del logo"
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                />
                            )}
                            <p className="text-lg font-medium text-gray-700">{leagueName || 'Nombre de la liga'}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Equipos</h2>
                        {teams.map((team, teamIndex) => (
                            <div
                                key={teamIndex}
                                className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                            >
                                <h3 className="text-xl font-bold text-gray-700 mb-4">
                                    Equipo {teamIndex + 1}
                                </h3>
                                <div className="mb-4">
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Nombre del Equipo
                                    </label>
                                    <input
                                        type="text"
                                        value={team.name}
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].name = e.target.value;
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Introduce el nombre del equipo ${teamIndex + 1}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Logo del Equipo
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].logo = e.target.files[0];
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddTeam}
                            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Añadir Equipo
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center font-medium">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-500 text-center font-medium">{success}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Crear Liga
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLeague;