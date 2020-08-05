const express = require("express");
const router = express.Router();

const { userNativeLogin, register, getProfile} = require("../controllers/user/login.controller");

const verifyToken = require("../middlewares/verifyToken");


//   Register the user
router.post("/user/auth/register", register);

// Login
router.post("/user/auth/login", userNativeLogin);

// Profile and account 
router.get("/user/auth/getCurrentProfile",verifyToken, getProfile);


module.exports = router