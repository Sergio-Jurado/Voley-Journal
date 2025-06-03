import { useState, useEffect } from 'react';

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem('token');
            if (!userId) {
                setLoading(false);
                setError('No user ID found in localStorage');
                return;
            }

            try {
                const response = await fetch(`https://voley-journal.onrender.com/api/users/getby/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserInfo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return { userInfo, loading, error };
};

export default useUserInfo;
