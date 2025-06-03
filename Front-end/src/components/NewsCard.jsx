import { useState } from "react";

const NewsCard = ({ newsItem, onDelete }) => {
    // Obtener el username del usuario logueado
    const token = localStorage.getItem("token");
    const [currentUser, setCurrentUser] = useState(null);

    // Solo hace fetch si no hay currentUser aún
    useState(() => {
        if (!currentUser && token) {
            fetch(`https://voley-journal.onrender.com/api/users/getby/${token}`)
                .then(res => res.json())
                .then(user => setCurrentUser(user.username))
                .catch(() => setCurrentUser(null));
        }
    }, [token, currentUser]);

    const handleDelete = () => {
        if (window.confirm("¿Seguro que quieres eliminar esta noticia?")) {
            onDelete(newsItem._id);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            {newsItem.image && (
                <div className="md:w-1/3 flex-shrink-0">
                    <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        className="w-full h-56 object-cover md:h-full"
                    />
                </div>
            )}

            <div className="p-6 flex flex-col justify-between md:w-2/3">
                <h2 className="text-2xl font-extrabold text-blue-700 mb-2">{newsItem.title}</h2>
                <hr className="mb-4 border-blue-200" />
                <p className="text-gray-700 text-base mb-4 leading-relaxed">{newsItem.text}</p>
                <span className="text-sm text-gray-500">Publicado por: {newsItem.createdBy}</span>
                {currentUser === newsItem.createdBy && (
                    <button
                        onClick={handleDelete}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition w-fit"
                    >
                        Eliminar Noticia
                    </button>
                )}
            </div>
        </div>
    );
};

export default NewsCard;