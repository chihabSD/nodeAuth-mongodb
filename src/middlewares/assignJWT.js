const { EXPIRY, SECRET } = require('../config/index')
const jwt = require("jsonwebtoken");
const assigneToken = {}
assigneToken.assign = (user) => {
    const secret = "momin123";
  const expire = "1d" ;

  const token = jwt.sign({ user}, secret, {
      expiresIn: expire,
    });
        return token
}

module.exports = assigneToken
