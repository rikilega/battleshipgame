import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token in local storage on a successful login:
                localStorage.setItem('token', data.token);
                // Redirect to a dashboard or another page if you want.
            } else {
                // Handle errors here. The `data` object may contain error messages 
                // sent from your server, which you can display to the user.
                console.error(data.errors);
            }

        } catch (error) {
            console.error("There was an error logging in:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {console.log("Rendering Login Component")}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
