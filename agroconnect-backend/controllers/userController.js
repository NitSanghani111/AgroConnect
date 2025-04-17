const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, userType, password, username, country, state, documentNo } = req.body;

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        const existingUser = await User.findOne({ $or: [{ username: trimmedUsername }, { email }] });
        if (existingUser) return res.status(400).json({ message: 'Username or email already taken' });

        const proofDocument = req.files?.proofDocument?.[0]?.filename || null;
        const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;

        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            userType,
            password: trimmedPassword,
            username: trimmedUsername,
            country,
            state,
            documentNo,
            proofDocument,
            profilePhoto,
        });

        await user.save();

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: 'User registered successfully', token, userType: user.userType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * @function loginUser
 * @description Logs in a user with given credentials.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<Object>} - The response object with the token, role and user details
/*******  2c69099f-c6ec-4e9e-8fff-eaf0d820b425  *******/
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "Username and password are required" });

        const user = await User.findOne({ username: username.trim() });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.userType }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.userType,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePhoto: user.profilePhoto,
                phone: user.phone,
                userType: user.userType
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };