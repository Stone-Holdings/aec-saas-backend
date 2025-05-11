const express = require('express');
const router = express.Router();

// Example route for login
router.post('/login', (req, res) => {
    res.send('Login Route');
});

// Example route for signup
router.post('/signup', (req, res) => {
    res.send('Signup Route');
});

// ✅ Test route
router.get('/test', (req, res) => {
    res.send('✅ Backend is working!');
});

module.exports = router;
