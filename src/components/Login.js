import React, { useState } from 'react';
import { NavLink } from "react-router"
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost:8000/login', { userName, password })
            .then(
                () => {
                    localStorage.setItem('userName', userName)
                    navigate('/home')
                }
            )
            .catch(err => alert(err.response.data));

    }
    return (
        <div className='container'>
            <div className='mt-5'></div>
            <div className='card' >
                <div className='card-body'>
                    <h2>Login</h2>
                    <div className="mb-3">
                        <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">

                        <button onClick={handleLogin}>Login</button>
                    </div>
                    <NavLink to='/register'>Register</NavLink>
                </div>
            </div>
        </div>

    );
}

export default Login;
