import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import '../styles/auth.css';

import { API_ROUTES, REDIRECT_DELAY, PANEL_TOGGLE_DELAY, MESSAGES as SHARED_MESSAGES } from '../../constants.js';

const ENDPOINTS = {
    SIGNUP: API_ROUTES.SIGNUP,
    SIGNIN: API_ROUTES.SIGNIN
};



export const Auth = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', retypePassword: '' });
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [messages, setMessages] = useState({ signup: { text: '', type: '' }, signin: { text: '', type: '' } });
    const navigate = useNavigate();

    const togglePanel = (active) => {
        setIsRightPanelActive(active);
        setMessages({ signup: { text: '', type: '' }, signin: { text: '', type: '' } });
    };

    const handleSignUpChange = (e) => setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
    const handleSignInChange = (e) => setSignInData({ ...signInData, [e.target.id]: e.target.value });

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (signUpData.password !== signUpData.retypePassword) {
            setMessages({ ...messages, signup: { text: SHARED_MESSAGES.PASSWORD_MISMATCH, type: 'error' } });
            return;
        }

        try {
            const res = await fetch(ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: signUpData.name, email: signUpData.email, password: signUpData.password })
            });
            const data = await res.json();
            if (res.ok) {
                setMessages({ ...messages, signup: { text: SHARED_MESSAGES.SIGNUP_SUCCESS, type: 'success' } });
                setTimeout(() => togglePanel(false), PANEL_TOGGLE_DELAY);
            } else {
                setMessages({ ...messages, signup: { text: data.message || 'Sign up failed', type: 'error' } });
            }
        } catch (err) {
            setMessages({ ...messages, signup: { text: SHARED_MESSAGES.SIGNUP_ERROR, type: 'error' } });
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(ENDPOINTS.SIGNIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signInData)
            });
            const data = await res.json();
            if (res.ok) {
                setMessages({ ...messages, signin: { text: `Welcome back, ${data.user.name}!`, type: 'success' } });
                setTimeout(() => navigate('/'), REDIRECT_DELAY);
            } else {
                setMessages({ ...messages, signin: { text: data.message || 'Sign in failed', type: 'error' } });
            }
        } catch (err) {
            setMessages({ ...messages, signin: { text: SHARED_MESSAGES.SIGNIN_ERROR, type: 'error' } });
        }
    };

    return (
        <div className="auth-wrapper">
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <div
                            className={`message ${messages.signup.type ? `message-${messages.signup.type}` : ''}`}
                            style={{ visibility: messages.signup.text ? 'visible' : 'hidden' }}
                        >
                            {messages.signup.text}
                        </div>
                        <Input type="text" id="name" placeholder="Name" value={signUpData.name} onChange={handleSignUpChange} required />
                        <Input type="email" id="email" placeholder="Email" value={signUpData.email} onChange={handleSignUpChange} required />
                        <Input type="password" id="password" placeholder="Password" value={signUpData.password} onChange={handleSignUpChange} required />
                        <Input type="password" id="retypePassword" placeholder="Retype Password" value={signUpData.retypePassword} onChange={handleSignUpChange} required />
                        <Button type="submit">Sign Up</Button>
                        <p className="mobile-only">
                            Already have an account? <span className="link-like" onClick={() => togglePanel(false)}>Sign In</span>
                        </p>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <div
                            className={`message ${messages.signin.type ? `message-${messages.signin.type}` : ''}`}
                            style={{ visibility: messages.signin.text ? 'visible' : 'hidden' }}
                        >
                            {messages.signin.text}
                        </div>
                        <Input type="email" id="email" placeholder="Email" value={signInData.email} onChange={handleSignInChange} required />
                        <Input type="password" id="password" placeholder="Password" value={signInData.password} onChange={handleSignInChange} required />
                        <a href="#">Forgot your password?</a>
                        <Button type="submit">Sign In</Button>
                        <p className="mobile-only">
                            Don't have an account? <span className="link-like" onClick={() => togglePanel(true)}>Sign Up</span>
                        </p>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Come join us!</h1>
                            <p>Create an account to discover local restaurants, hidden food gems, and plan your next bite.</p>
                            <p>Already have an account?</p>
                            <button className="ghost" onClick={() => togglePanel(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>Jump back in and explore your favorite local food spots.</p>
                            <p>No account yet?</p>
                            <button className="ghost" onClick={() => togglePanel(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
