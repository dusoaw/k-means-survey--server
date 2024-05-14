const jwt = require("jsonwebtoken");
const { JWT_TK } = require("../secrets");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, JWT_TK);
    req.user = user;

    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({ message: "Unauthorized" });
  }
};
