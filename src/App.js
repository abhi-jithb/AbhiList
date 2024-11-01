import React, { useEffect, useState } from 'react';
import TodoList from './components/todoList';
import AuthComponent from './components/AuthComponent';
import Footer from './components/Footer';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function App() {
    const [user, setUser] = useState(null);

    const checkAndSaveUser = async (user) => {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, {
                email: user.email,
                lastLogin: new Date(),
            });
            console.log('New user data saved.');
        } else {
            console.log('User already exists in Firestore.');
        }
    };

    useEffect(() => {
        const autoLogin = async () => {
            try {
                await signInWithEmailAndPassword(
                    auth,
                    process.env.REACT_APP_FIREBASE_EMAIL,
                    process.env.REACT_APP_FIREBASE_PASSWORD
                );
                console.log('Auto-login successful');
            } catch (error) {
                console.error('Auto-login failed:', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                checkAndSaveUser(user);
            } else {
                setUser(null);
                autoLogin();
            }
        });

        return () => unsubscribe();
    }, []);

    // Logout function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="App">
            {user ? (
                <>
                    <TodoList />
                    <button onClick={handleLogout} className="logout-button">Log Out</button> {/* Logout button */}
                </>
            ) : (
                <AuthComponent />
            )}
            <Footer />
        </div>
    );
}

export default App;
