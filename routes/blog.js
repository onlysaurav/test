const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const blog = require("../models/blog");
const register  = require('../models/signup')
const authenticateUser = require('../middleware/authenticateUser');
// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:multiformdata");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check if file is an image or a video
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

// Configure multer upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Blog post submission route
router.post("/blog", upload.array("assets", 5), async (req, res) => {
  const { userId, title, description } = req.body;
  try {
    const assets = req.files.map((file) => file.path);

    const newBlogPost = new blog({
      userId,
      title,
      description,
      assets,
    });

    const savedBlogPost = await newBlogPost.save();
    res.json(savedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/getblogs", authenticateUser, async (req, res) => {
  try {
    // Fetch the blog posts associated with the logged-in user
    const userId = req.session.userId;
    const blogs = await blog.findOne({ userId: userId });

    res.json({
      message:success,
      result:blogs
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Define the route to delete a blog post
router.delete("/blog/delete", authenticateUser, async (req, res) => {
  try {
    // Retrieve the logged-in user's ID from the session
    const userId = req.session.userId;

    // Retrieve the user information from the database based on the user ID
    const user = await register.findById(userId);

    // Delete the blog post from the database
    const deleteBlog = await blog.findOneAndDelete({userId:userId})

    // Send a success response
    res.send('blog deleted successfully');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = router;
