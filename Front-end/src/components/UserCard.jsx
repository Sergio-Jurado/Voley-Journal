import PropTypes from 'prop-types';

const UserCard = ({ user, onDelete }) => {
    return (
        <div className="bg-blue-100 border border-blue-500 rounded-lg p-4 max-w-xs mx-auto shadow-lg text-center">
            <h2 className="text-blue-900 text-xl font-bold mb-2">{user.username}</h2>
            <p className="text-blue-700 mb-1">{user.name} {user.lastName}</p>
            <p className="text-blue-600 mb-4">{user.role}</p>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={onDelete}
            >
                Eliminar
            </button>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserCard;