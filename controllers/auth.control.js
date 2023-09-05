const User = require("../models/user.model");
const loggerEvent = require("../sevices/logger.services");
const logger = loggerEvent("auth");

const userController = {
  newUser: async (req, res) => {
    try {
      logger.info(req.body);
      let data = req.body;
      let duplicatedEmail = await User.findOne({
        email: data.email,
      });
      if (duplicatedEmail) {
        return res.status(403).send({
          message: "Email is already taken !!",
        });
      }
      let newUser = new User(data);
      await newUser.save();
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(201)
        .send({
          message: "Account created !!",
        });
    } catch (error) {
      logger.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },

  // login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Invalid email or password",
        });
      }

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({
          message: "Login successful",
          user: user,
        });
    } catch (error) {
      logger.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },
};

module.exports = userController;
