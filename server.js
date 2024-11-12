// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dummy database for demonstration
const users = [];

// Signup route
app.post('/signup', (req, res) => {
    const { name, role, Batch, urn, DOB, email } = req.body;
    
    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        return res.status(400).send("User already exists. Please log in.");
    }
    
    // Add user to the "database"
    users.push({ name, role, Batch, urn, DOB, email });
    res.send("Signup successful! You can now log in.");
});

// Login route
app.post('/login', (req, res) => {
    const { email } = req.body;
    
    // Verify if user exists
    const user = users.find((user) => user.email === email);
    if (user) {
        res.send("Login successful! Redirecting to home page...");
    } else {
        res.status(400).send("User not found. Please sign up first.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
