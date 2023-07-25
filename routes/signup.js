const express = require("express");
const router = express.Router();
const register = require("../models/signup");

// Signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await register.findOne({ username: username });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const data = new register(req.body);
    const response = await data.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
