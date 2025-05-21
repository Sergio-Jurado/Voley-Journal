import { Link } from "react-router-dom";

const LeagueCard = ({ league }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img
                src={`http://localhost:5000/media/${league.logo}`}
                alt={league.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{league.name}</h2>
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