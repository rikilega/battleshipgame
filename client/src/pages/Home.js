// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Battleship Game!</h1>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
}

export default Home;
