const express = require('express');
const multer = require('multer');
const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require("../middleware/authmiddleware");
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/register', upload.fields([{ name: 'proofDocument' }, { name: 'profilePhoto' }]), registerUser);
router.post('/login', loginUser);
router.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});
module.exports = router;
