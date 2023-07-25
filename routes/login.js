const express = require('express');
const router = express.Router();
const register  = require('../models/signup')
const secret_key = "saurabhtiwari";
const CryptoJS = require("crypto-js");

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await register.findOne({username:username});
    console.log("username",user.username)
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    
    // Compare hashed passwords
    const bytes = await CryptoJS.AES.decrypt(user.password, secret_key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (password !== originalText) {
      return res.status(401).send('Invalid username or password');
    }
    user.isLoggedIn = true;
    await user.save();
    req.session.userId = user._id;
    res.send('Login successful');
  });

  router.post('/logout', async (req, res) => {
    try {
      // Find the user by their ID
      const user = await register.findById(req.session.userId);
  
      if (!user) {
        return res.sendStatus(401);
      }
  
      // Update the session status or any other relevant fields in the user model
      user.isLoggedIn = false;
      await user.save();
  
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  module.exports = router;