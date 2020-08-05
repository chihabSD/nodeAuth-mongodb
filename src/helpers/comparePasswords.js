const bcrypt = require("bcryptjs");
const comparePasswords = async (password, accountPassword) => {
    console.log(password, accountPassword)
    return  await bcrypt.compare(password, accountPassword);
    // return matched
}
const saltPassword = async (newPassword) => {
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    return hashPassword
}
module.exports = {comparePasswords, saltPassword}