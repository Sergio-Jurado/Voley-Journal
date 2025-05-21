import { useState, useEffect } from "react";
import NewsCard from "../../components/NewsCard";

const ShowNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/news/get");
                if (!response.ok) {
                    throw new Error("Error al obtener las noticias");
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p className="text-gray-500 text-lg text-center">Cargando noticias...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg text-center">{error}</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Noticias</h1>
            {news.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">No hay noticias disponibles.</p>
            ) : (
                <div className="space-y-8">
                    {news.map((item) => (
                        <NewsCard key={item._id} newsItem={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowNews;