import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import fondo from '../../../public/media/fondo.jpg';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para iniciar sesión
        if (username === '' || password === '') {
            setError('Por favor, completa todos los campos');
        } else {
            try {
                const response = await fetch("https://voley-journal.onrender.com/api/users/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                })

                if (!response.ok) {
                    setError("Usuario o contraseña incorrecta, por favor, intentelo de nuevo");
                    console.log(response);
                    throw new Error("El usuario no pudo iniciar sesión");

                }

                const data = await response.json();
                console.log(data);
                localStorage.setItem('token', data.token);
                navigate("/main");

                console.log('Inicio de sesión exitoso:', { username, password });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">Iniciar Sesión</h2>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                    Nombre de usuario
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
                onClick={handleLogin}
            >
                Iniciar Sesión
            </button>
        </div>
    );
}

function Register() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('coach');
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || lastname === '' || username === '' || password === '' || confirmPassword === '' || !role) {
            setError('Por favor, completa todos los campos');
        } else if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
        } else {
            try {
                const response = await fetch("https://voley-journal.onrender.com/api/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        name: name,
                        lastName: lastname,
                        role: role
                    })
                });

                if (!response.ok) {
                    console.log(response);
                    throw new Error("No se pudo registrar el usuario");
                } else {
                    console.log(response);
                    setResponse("Usuario Registrado, por favor, inicie sesión");
                    setName("");
                    setLastname("");
                    setUserName("");
                    setPassword("");
                    setConfirmPassword("");
                    setRole("coach");
                    setError(null);
                }

            } catch (error) {
                console.log(error.message);
                setError(error.message);
                setResponse("")
            }
        }
    };

    return (
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">Registrarse</h2>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                    Nombre
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="lastname">
                    Apellidos
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                    Nombre de usuario
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="role">
                    ¿Qué eres?
                </label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="coach">Entrenador</option>
                    <option value="journalist">Periodista</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirmar Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {response && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{response}</span>
                </div>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
                onClick={handleSubmit}
            >
                Registrarse
            </button>
        </div>
    );
}


const AuthPage = () => {
    return (
        <div
            className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(/media/fondo.jpg)`,
            }}
        >
            {/* Encabezado */}
            <h1 className="text-white text-4xl font-bold  mb-10">Voley Journal</h1>

            {/* Contenedor de componentes */}
            <div className="flex space-x-10">
                <Login />
                <Register />
            </div>
        </div>
    );
}

export default AuthPage