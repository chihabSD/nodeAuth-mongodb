const User = require("../models/auth.model");
const bcrypt = require('bcryptjs')
/***************** Register user function, (admin, superadmin, user ) */
const findUser = async (details) => {
    console.log(details)

      // Validate the user name
    //   const account = await User.findOne({ _id: user.user._id });
   
        let account = await User.findOne({ _id: details});
        return account 
    //   console.log(user)

};

module.exports = {
    findUser
}