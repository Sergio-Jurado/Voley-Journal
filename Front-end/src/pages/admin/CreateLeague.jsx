import { useState } from 'react';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueLogo, setLeagueLogo] = useState('');
    const [teams, setTeams] = useState([{ name: '', logo: '', players: [{ name: '', lastName: '', number: '', position: '', nationality: '' }] }]);

    const handleAddTeam = () => {
        setTeams([...teams, { name: '', logo: '', players: [{ name: '', lastName: '', number: '', position: '', nationality: '' }] }]);
    };

    const handleAddPlayer = (teamIndex) => {
        const newTeams = [...teams];
        newTeams[teamIndex].players.push({ name: '', lastName: '', number: '', position: '', nationality: '' });
        setTeams(newTeams);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const leagueResponse = await fetch('/api/leagues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: leagueName, logo: leagueLogo }),
            });
            const leagueData = await leagueResponse.json();

            for (const team of teams) {
                const teamResponse = await fetch(`/api/leagues/${leagueData._id}/teams`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: team.name, logo: team.logo }),
                });
                const teamData = await teamResponse.json();

                for (const player of team.players) {
                    await fetch(`/api/teams/${teamData._id}/players`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(player),
                    });
                }
            }

            alert('Liga creada exitosamente');
        } catch (error) {
            console.error('Error creating league:', error);
            alert('Error creating league');
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
                        type="text"
                        value={leagueLogo}
                        onChange={(e) => setLeagueLogo(e.target.value)}
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
                                type="text"
                                value={team.logo}
                                onChange={(e) => {
                                    const newTeams = [...teams];
                                    newTeams[teamIndex].logo = e.target.value;
                                    setTeams(newTeams);
                                }}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        {team.players.map((player, playerIndex) => (
                            <div key={playerIndex} className="mb-2 p-2 border border-gray-200 rounded">
                                <h3 className="text-lg font-bold mb-1">Jugador {playerIndex + 1}</h3>
                                <div className="mb-1">
                                    <label className="block text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        value={player.name}
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].players[playerIndex].name = e.target.value;
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-gray-700">Apellido</label>
                                    <input
                                        type="text"
                                        value={player.lastName}
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].players[playerIndex].lastName = e.target.value;
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-gray-700">Número</label>
                                    <input
                                        type="text"
                                        value={player.number}
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].players[playerIndex].number = e.target.value;
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-gray-700">Posición</label>
                                    <input
                                        type="text"
                                        value={player.position}
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].players[playerIndex].position = e.target.value;
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-gray-700">Nacionalidad</label>
                                    <input
                                        type="text"
                                        value={player.nationality}
                                        onChange={(e) => {
                                            const newTeams = [...teams];
                                            newTeams[teamIndex].players[playerIndex].nationality = e.target.value;
                                            setTeams(newTeams);
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddPlayer(teamIndex)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Añadir Jugador
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTeam}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mb-4"
                >
                    Añadir Equipo
                </button>
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