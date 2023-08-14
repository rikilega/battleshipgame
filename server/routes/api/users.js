const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,  
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
   }   
});

// You can then follow this pattern for login, viewing a user profile, etc.

// @route   POST api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,  
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


const { checkJwtToken } = require('../../middleware/auth');
  // assuming you have an authentication middleware

// @route   GET api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', checkJwtToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // exclude the password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', checkJwtToken, async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }

        if (username) user.username = username;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }
        res.status(500).send('Server error');
    }
});

// @route   GET api/users/all
// @desc    Get all users (for admin or testing)
// @access  Private or Admin
router.get('/all', checkJwtToken, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // excluding password
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/users/me
// @desc    Delete logged in user & associated data
// @access  Private
router.delete('/me', checkJwtToken, async (req, res) => {
    try {
        // Delete user's associated data first (if there's any, e.g., games)
        // await Game.deleteMany({ user: req.user.id });

        // Delete user
        await User.findByIdAndRemove(req.user.id);

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/users/updatepassword
// @desc    Update user's password
// @access  Private
router.put('/updatepassword', checkJwtToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Current password is incorrect' }] });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ msg: 'Password updated' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;


