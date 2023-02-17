const userService = require("../services/userService");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
class userController {
  async register(req, res, next) {
    try {
      const { body } = req;

      const user = await userService.getOneUser({ email: body.email });

      if (user) {
        return res.status(404).send({ message: "User already exiting" });
      }
      body.password = md5(body.password);

      const newUser = await userService.create(body);

      return res.send({ data: newUser });
    } catch (error) {
      return res.status(500).send({ message: "something went wrong" });
    }
  }

  async login(req, res, next) {
    try {
      const { body } = req;

      const user = await userService.getOneUser({ email: body.email });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      } else if (user.password === md5(body.password)) {
        const token = jwt.sign({ id: user._id }, "shhhhh");

        return res.json({ data: user, token });
      } else {
        return res.status(400).send({ message: "password is not match" });
      }
    } catch (error) {
      return res.status(500).send({ message: "something went wrong" });
    }
  }
}

module.exports = new userController();
