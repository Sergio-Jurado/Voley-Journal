import { useEffect, useState } from 'react';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://voley-journal.onrender.com/api/users/get')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (userId) => {
        fetch(`https://voley-journal.onrender.com/api/users/delete/${userId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al eliminar el usuario");
                }
                return response.json();
            })
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div className="max-w-8xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <h1 className="text-3xl font-black text-blue-700 mb-8 tracking-tight drop-shadow text-center">Usuarios Registrados</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="bg-blue-100 text-blue-800">
                            <th className="py-3 px-4 text-left">Nombre de Usuario</th>
                            <th className="py-3 px-4 text-left">Nombre</th>
                            <th className="py-3 px-4 text-left">Apellido</th>
                            <th className="py-3 px-4 text-left">Rol</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-t hover:bg-blue-50 transition">
                                <td className="py-2 px-4">{user.username}</td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.lastName}</td>
                                <td className="py-2 px-4 capitalize">{user.role}</td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold shadow transition"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-blue-500 font-semibold">
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowUsers;