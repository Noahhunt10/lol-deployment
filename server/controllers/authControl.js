const { User } = require("../models/user");
require("dotenv").config();
const { SECRET } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, res) => {
    console.log("register");
    try {
      const { username, password } = req.body;

      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        res
          .status(400)
          .send("Username is taken, please provide diffrent username.");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username,
          hashedPassword: hash,
        });
        const token = createToken(newUser.username, newUser.id);
        const exp = Date.now() + 1000 * 60 * 60 * 24;
        res.status(200).send({
          username: newUser.username,
          userId: newUser.id,
          token,
          exp,
        });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPassword
        );
        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 24;
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token,
            exp,
          });
        } else {
          res.status(400).send("ERROR IN BACKEND LOGIN");
        }
      } else {
        res.status(400).send("User does not exist.");
      }
    } catch (err) {
      console.log(err);
      console.log("error in login");
      res.sendStatus(400);
    }
  },
};
