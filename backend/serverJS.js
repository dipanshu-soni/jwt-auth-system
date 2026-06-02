require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected"))
.catch((err) => console.log("Error : ",err));

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, required: true}
});

const User = mongoose.model("User",userSchema);

// checking if a user is logged in before letting them access specific data.
function authMiddleware(req, res, next) {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).send("No token provided");
        }

        const token = authHeader.split(" ")[1]; // Bearer TOKEN

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).send("Invalid token");
    }
}

// TEST ROUTE
app.get('/', (req, res) => {
    res.send("Server is running !");
});

// REGISTER ROUTE
app.post('/register', async (req, res) => {
    const {name, email, password, age} = req.body;
    
    if(!name || !email || !password || !age)
    {
        return res.status(400).send("All fields are required !");
    }

    if(password.length < 6)
    {
        return res.status(400).send("Password must be at least 6 characters long !");
    }

    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();
        res.status(201).json({
            message: "Registration successful and Data Saved!"
        });
    }

    catch(error)
    {
        console.log(error);
        res.status(500).json({
            message: "Error in saving data",
            error: error.message
        });
    }
});

// LOGIN ROUTE
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try
    {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).send("Invalid password");
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.send({
            message: "Login successful",
            token: token
        });

    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in logging in !",
            error: error.message
        });
    }
});

app.get('/profile', authMiddleware, async (req, res) => {
    try
    {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.json(user);
    }
    catch(err)
    {
        res.status(500).json({
            message: "Error fetching profile",
            error: error.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});