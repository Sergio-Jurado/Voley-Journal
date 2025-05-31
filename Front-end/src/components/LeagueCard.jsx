import { Link } from "react-router-dom";

const LeagueCard = ({ league }) => {
    return (
        <div className="w-full max-w-xs bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg border border-blue-200 p-6 flex flex-col items-center justify-center mt-6 mx-auto">
            <img
                src={`http://localhost:5000/media/${league.logo}`}
                alt={league.name}
                className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-300 shadow"
            />
            <h2 className="text-xl font-extrabold text-blue-800 mb-2 text-center">{league.name}</h2>
            <Link
                to={`/showLeague/${league._id}`}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Ver Liga
            </Link>
        </div>
    );
};

export default LeagueCard;