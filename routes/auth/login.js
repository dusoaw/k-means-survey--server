const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
const { JWT_TK } = require("../../secrets");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, JWT_TK, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: false });

    res.status(200).json({ token: token });
  } else {
    res.status(403).json({ message: "Invalid email or password" });
  }
};
