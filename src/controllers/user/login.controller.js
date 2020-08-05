
const User = require("../../models/auth.model"); //Go to models and grab the user.model

const bcrypt = require("bcryptjs");


require("dotenv").config();
const path = require("path");


const assigneToken = require("../../middlewares/assignJWT");



const loginController = {};

/**
 * http://localhost:5000/api/user/auth/register
 */
loginController.register = async (req, res, next) => {

  try {
    const { email, password, username } = req.body.data;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(403).send({ error: "Email is already in use " });
      
    }
  
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create User In DataBase
    
    const user = new User({
      username,
      email,
      password: hashPassword,
     
    });
    const newUser = await user.save();
    return res.status(200).send({ data: newUser });

  } catch (e) {
    return next(e);
  }
};


// native login
/**
 * http://localhost:5000/api/user/auth/login
 */
loginController.userNativeLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Check Email in use
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res
        .status(403)
        .send({ error: " incorrect email or password " });
    }

    //Compare Passwords
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res
        .status(403)
        .send({ error: "  incorrect email or password " });
    }

    // Assign token once login is granted
    // Check the assigneToken function 
    // the token is reterived from req.headers["authorization"] (Check verifyToken in middlewares directory)
    const token = assigneToken.assign(user);

    return res.status(200).send({ token });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};


// Get the current logged in user
/**
 * http://localhost:5000/api/user/auth/getCurrentProfile
 */
loginController.getProfile = async (req, res, next) => {
  const { user } = req;
  try {

    const account = await User.findOne({_id: user.user._id });

      return res.status(200).send({ user : account });
 
     
 
  } catch (e) {
    console.log(e);
    return next(e);
  }
};


module.exports = loginController;
