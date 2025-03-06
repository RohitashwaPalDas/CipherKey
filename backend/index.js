if(process.env.NODE_ENV != "productiion"){
    require('dotenv').config();
};

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const Password = require("./models/passwords"); 
const User = require("./models/users");
const port = 3000;
const path = require('path');
const MONGO_URL = process.env.MONGO_URL;
const MongoStore = require('connect-mongo');

const _dirname = path.resolve();

main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto:{
        secret: process.env.secretKey
    },
    touchAfter: 24 * 3600 // time period in seconds
})

store.on("error", function(e){
    console.log("Session Store Error", e);
})

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Only save session if something is stored in it
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        // sameSite: "none"
    }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/check-username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



app.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;

        const user = new User({ firstname, lastname, username });
        const registeredUser = await User.register(user, password);

        // Log in the user after signup
        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ error: "Login failed after signup" });
            }
            res.json({ message: "Signup successful", user: registeredUser });
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});


app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Logout successful' });
    });
});


app.get('/auth-check', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false });
    }
});

app.post('/password/new', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    try {
        console.log(req.user);
        const { site, username, password } = req.body;

        if (!site || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newPassword = new Password({ site, username, password, owner: req.user._id });
        await newPassword.save();

        res.status(201).json({ message: "Password saved", data: newPassword });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/password/all", async (req, res) => {
    try {
        const passwords = await Password.find({owner: req.user._id});
        res.status(200).json({ data: passwords });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/password/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    try {
        const id = req.params.id;
        await Password.findByIdAndDelete(id);
        res.status(200).json({ message: "Password deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/password/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    try {
        const id = req.params.id;
        console.log(id);
        const { site, username, password } = req.body;
        await Password.findByIdAndUpdate
            (id, { site, username, password });
        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static(path.join(_dirname, '/frontend/dist')));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
