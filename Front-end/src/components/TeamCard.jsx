const TeamCard = ({ team }) => {
    return (
        <li className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
            {team.logo && (
                <img
                    src={team.logo}
                    alt={team.name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                />
            )}
            <p className="text-lg font-medium text-gray-800">{team.name}</p>
        </li>
    );
};

export default TeamCard;