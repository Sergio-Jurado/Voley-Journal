import { useState, useEffect } from 'react';

const EditTeam = ({ playerId }) => {
    const [player, setPlayer] = useState({
        name: '',
        lastName: '',
        number: '',
        position: '',
        nationality: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/players/${playerId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del jugador');
                }
                return response.json();
            })
            .then((data) => {
                setPlayer({
                    name: data.name,
                    lastName: data.lastName,
                    number: data.number,
                    position: data.position,
                    nationality: data.nationality,
                });
            })
            .catch((error) => setError(error.message));
    }, [playerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/players/${playerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar los datos del jugador');
                }
                return response.json();
            })
            .then(() => {
                setSuccess('Jugador actualizado exitosamente');
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                setSuccess(null);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Jugador</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={player.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        value={player.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Número</label>
                    <input
                        type="number"
                        name="number"
                        value={player.number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Posición</label>
                    <select
                        name="position"
                        value={player.position}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Seleccionar posición</option>
                        <option value="Setter">Setter</option>
                        <option value="Middle-blocker">Middle-blocker</option>
                        <option value="Attacker">Attacker</option>
                        <option value="Opposite">Opposite</option>
                        <option value="Libero">Libero</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Nacionalidad</label>
                    <input
                        type="text"
                        name="nationality"
                        value={player.nationality}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditTeam;