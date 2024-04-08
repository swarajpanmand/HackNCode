const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');




const app = express();

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
    { email: 'user@example.com', password: 'password' },
    { email: 'user1@example.com', password: 'password1' }
];

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'login1.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the provided credentials match any user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Redirect to the home page on successful login
        res.redirect('/index2.html');
    } else {
        // Send a response indicating invalid credentials
        res.status(401).send('Invalid credentials');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

