const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./server/models/profile'); 


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(session({ secret: '_secret_key', resave: false, saveUninitialized: true }));
app.use(express.static(__dirname + '/src'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/register.html'));
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        console.log(username,email,password)
        const newUser = new User({ username, email, password });
        await newUser.save();

        console.log('User registered successfully!');
        // res.redirect('/profile');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Failed to register user. Please try again.');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});