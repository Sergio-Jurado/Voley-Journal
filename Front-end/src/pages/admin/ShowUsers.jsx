import { useEffect, useState } from 'react';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/users/get')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (userId) => {
        fetch(`http://localhost:5000/api/users/delete/${userId}`, {
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Nombre De Usuario</th>
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Apellido</th>
                        <th className="py-2">Rol</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-t">
                            <td className="py-2">{user.username}</td>
                            <td className="py-2">{user.name}</td>
                            <td className="py-2">{user.lastName}</td>
                            <td className="py-2">{user.role}</td>
                            <td className="py-2">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowUsers;