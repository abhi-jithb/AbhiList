// src/App.js
import React, { useEffect, useState } from 'react';
import TodoList from './components/todoList';
import AuthComponent from './components/AuthComponent';
import { auth } from './firebaseConfig'; // Import auth from your firebase config
import { onAuthStateChanged } from 'firebase/auth';
import Footer from './components/Footer'; // Import Footer component

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // User is signed in
            } else {
                setUser(null); // User is signed out
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div className="App">
            {user ? (
                <TodoList /> // Show TodoList if user is logged in
            ) : (
                <AuthComponent />
            )}
             <Footer />
        </div>
    );
}

export default App;
