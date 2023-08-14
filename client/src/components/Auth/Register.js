import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
  
      if (response.ok) {
        // Here you can handle a successful registration.
        // For example, you can store the token in the local storage:
        localStorage.setItem('token', data.token);
        // And maybe redirect the user to a dashboard or login page.
      } else {
        // Handle errors here. The `data` object may contain error messages 
        // sent from your server, which you can display to the user.
        console.error(data.errors);
      }
  
    } catch (error) {
      console.error("There was an error registering the user:", error);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      {console.log("Rendering register Component")}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
