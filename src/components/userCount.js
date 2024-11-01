import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const UserCount = () => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const userCollection = collection(db, 'users'); // Use db to reference the Firestore collection
                const userSnapshot = await getDocs(userCollection);
                setUserCount(userSnapshot.size); // Get the count of users
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div style={{ textAlign: 'left', fontWeight: 'lighter' }}>
            <h2 style={{fontSize:'20px', textAlign: 'left'}}>Happy users🥳: {userCount}+</h2>
        </div>
    );
};

export default UserCount;
