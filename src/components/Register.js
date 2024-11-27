import React, { useState } from 'react';
import { NavLink } from "react-router"
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

function Register() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        confirmPassword: '',
        fname: '',
        lname: '',
        email: '',
    });
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/register', {
                userName: formData.userName,
                password: formData.password,
                fname: formData.fname,
                lname: formData.lname,
                email: formData.email,
            });
            setMessage(response.data);
            navigate('/')
        } catch (error) {
            setMessage("Error registering user: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className='container'>
            <div className='mt-5'></div>
            <div className='card' >
                <div className='card-body'>
                    <div>
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Username"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <br />
                            <div className='mb-3'>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <br />
                            <div className='mb-3'>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <br />
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    name="fname"
                                    placeholder="First Name"
                                    value={formData.fname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <br />
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    name="lname"
                                    placeholder="Last Name"
                                    value={formData.lname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <br />
                            <div className='mb-3'>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <br />
                            <button type="submit">Register</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>

                    <NavLink to='/'>Login</NavLink>
                </div>
            </div>
        </div>

    );
}

export default Register;
