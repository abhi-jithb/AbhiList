// src/components/AuthComponent.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const AuthComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log('Login successful!');
                })
                .catch((error) => {
                    console.error('Login error:', error);
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log('Signup successful!');
                })
                .catch((error) => {
                    console.error('Signup error:', error);
                });
        }
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log('Google sign-in successful!', result);
            })
            .catch((error) => {
                console.error('Google sign-in error:', error);
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
