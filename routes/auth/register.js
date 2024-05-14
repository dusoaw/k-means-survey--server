const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
const { JWT_TK } = require("../../secrets");

module.exports = async (req, res) => {
  let { email, password } = req.body;

  password = await bcrypt.hash(password, 10);

  UserModel.create({
    email: email,
    password: password,
  })
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_TK, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: false });

      res.status(200).json({ token: token });
    })
    .catch((error) => res.json(error));
};
