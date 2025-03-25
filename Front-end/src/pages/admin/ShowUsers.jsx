/*
Aqui quiero que salgan todos los usuarios, que pueda cambiarles el rol y eliminarlos
*/

import React, { useEffect, useState } from 'react';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users/')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const changeRole = (userId, newRole) => {
        fetch(`/api/users/${userId}/change_role/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: newRole }),
        })
        .then(response => response.json())
        .then(data => {
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        });
    };

    const deleteUser = (userId) => {
        fetch(`/api/users/${userId}/`, {
            method: 'DELETE',
        })
        .then(() => {
            setUsers(users.filter(user => user.id !== userId));
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Rol</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-t">
                            <td className="py-2">{user.id}</td>
                            <td className="py-2">{user.name}</td>
                            <td className="py-2">{user.email}</td>
                            <td className="py-2">{user.role}</td>
                            <td className="py-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => changeRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                >
                                    Cambiar Rol
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteUser(user.id)}
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