import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const AuthComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is already logged in:', user);
                // Optionally redirect to your main app page
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(''); // Clear any previous error messages

        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log('Login successful!');
                    // Redirect or perform further actions after successful login
                })
                .catch((error) => {
                    console.error('Login error:', error);
                    setAuthError(error.message); // Set error message to display
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log('Signup successful!');
                    // Optionally log in the user immediately after signup
                })
                .catch((error) => {
                    console.error('Signup error:', error);
                    setAuthError(error.message); // Set error message to display
                });
        }
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log('Google sign-in successful!', result);
                // Optionally redirect or perform further actions after successful sign-in
            })
            .catch((error) => {
                console.error('Google sign-in error:', error);
                setAuthError(error.message); // Set error message to display
            });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {authError && <p className="error-message">{authError}</p>}
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                <button className="google-btn" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
                <div className="toggle-container">
                    <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
