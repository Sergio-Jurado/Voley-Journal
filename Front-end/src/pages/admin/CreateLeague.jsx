import { useState } from 'react';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueLogo, setLeagueLogo] = useState(null);
    const [leagueLogoPreview, setLeagueLogoPreview] = useState(null);
    const [teams, setTeams] = useState([{ name: '', logo: null, players: [{ name: '', lastName: '', number: '', position: '', nationality: '' }] }]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAddTeam = () => {
        setTeams([...teams, { name: '', logo: null, players: [{ name: '', lastName: '', number: '', position: '', nationality: '' }] }]);
    };

    const handleAddPlayer = (teamIndex) => {
        const newTeams = [...teams];
        newTeams[teamIndex].players.push({ name: '', lastName: '', number: '', position: '', nationality: '' });
        setTeams(newTeams);
    };

    const handleLeagueLogoChange = (e) => {
        const file = e.target.files[0];
        setLeagueLogo(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLeagueLogoPreview(reader.result);
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

            // Crear la liga
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

            // Crear los equipos y jugadores
            for (const team of teams) {
                if (!team.name || !team.logo) {
                    throw new Error('Todos los equipos deben tener un nombre y un logo');
                }

                // Crear el equipo
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

                const teamData = await teamResponse.json();
                const teamId = teamData.team._id;

                // Crear los jugadores del equipo
                for (const player of team.players) {
                    if (!player.name || !player.lastName || !player.number || !player.position || !player.nationality) {
                        throw new Error('Todos los jugadores deben tener un nombre, apellido, número, posición y nacionalidad');
                    }

                    const playerFormData = new FormData();
                    playerFormData.append('name', player.name);
                    playerFormData.append('lastName', player.lastName);
                    playerFormData.append('number', player.number);
                    playerFormData.append('position', player.position);
                    playerFormData.append('nationality', player.nationality);
                    playerFormData.append('team', teamId);

                    const playerResponse = await fetch(`http://localhost:5000/api/players/create`, {
                        method: 'POST',
                        body: playerFormData,
                    });

                    if (!playerResponse.ok) {
                        throw new Error('Error al añadir un jugador');
                    }
                }
            }

            setSuccess('Liga, equipos y jugadores creados exitosamente');
            setLeagueName('');
            setLeagueLogo(null);
            setLeagueLogoPreview(null);
            setTeams([{ name: '', logo: null, players: [{ name: '', lastName: '', number: '', position: '', nationality: '' }] }]);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-10 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Crear Liga</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Nombre de la Liga</label>
                        <input
                            type="text"
                            value={leagueName}
                            onChange={(e) => setLeagueName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Introduce el nombre de la liga"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Logo de la Liga</label>
                        <input
                            type="file"
                            onChange={handleLeagueLogoChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        {leagueLogoPreview && (
                            <img src={leagueLogoPreview} alt="Vista previa del logo" className="mt-4 w-32 h-32 object-cover rounded-full" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Equipos</h2>
                        {teams.map((team, index) => (
                            <div key={index} className="mb-6">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Nombre del Equipo</label>
                                <input
                                    type="text"
                                    value={team.name}
                                    onChange={(e) => {
                                        const newTeams = [...teams];
                                        newTeams[index].name = e.target.value;
                                        setTeams(newTeams);
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder={`Introduce el nombre del equipo ${index + 1}`}
                                />
                                <label className="block text-lg font-medium text-gray-700 mb-2 mt-4">Logo del Equipo</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const newTeams = [...teams];
                                        newTeams[index].logo = file;
                                        setTeams(newTeams);
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                <h3 className="text-lg font-bold text-gray-700 mt-4">Jugadores</h3>
                                {team.players.map((player, playerIndex) => (
                                    <div key={playerIndex} className="mt-4">
                                        <input
                                            type="text"
                                            value={player.name}
                                            onChange={(e) => {
                                                const newTeams = [...teams];
                                                newTeams[index].players[playerIndex].name = e.target.value;
                                                setTeams(newTeams);
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                            placeholder="Nombre del jugador"
                                        />
                                        <input
                                            type="text"
                                            value={player.lastName}
                                            onChange={(e) => {
                                                const newTeams = [...teams];
                                                newTeams[index].players[playerIndex].lastName = e.target.value;
                                                setTeams(newTeams);
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                            placeholder="Apellido del jugador"
                                        />
                                        <input
                                            type="number"
                                            value={player.number}
                                            onChange={(e) => {
                                                const newTeams = [...teams];
                                                newTeams[index].players[playerIndex].number = e.target.value;
                                                setTeams(newTeams);
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                            placeholder="Número del jugador"
                                        />
                                        <select
                                            value={player.position}
                                            onChange={(e) => {
                                                const newTeams = [...teams];
                                                newTeams[index].players[playerIndex].position = e.target.value;
                                                setTeams(newTeams);
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                        >
                                            <option value="">Selecciona la posición</option>
                                            <option value="Setter">Setter</option>
                                            <option value="Middle-blocker">Middle-blocker</option>
                                            <option value="Attacker">Attacker</option>
                                            <option value="Opposite">Opposite</option>
                                            <option value="Libero">Libero</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={player.nationality}
                                            onChange={(e) => {
                                                const newTeams = [...teams];
                                                newTeams[index].players[playerIndex].nationality = e.target.value;
                                                setTeams(newTeams);
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            placeholder="Nacionalidad del jugador"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddPlayer(index)}
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Añadir Jugador
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddTeam}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Añadir Equipo
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
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