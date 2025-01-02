import React from 'react'

const UserCard = ({ user }) => {
    return (
        <div className=''>
            <h2>{user.username}</h2>
            <p>{user.name} {user.lastName}</p>
            <p>{user.role}</p>
        </div>
    )
}

export default UserCard