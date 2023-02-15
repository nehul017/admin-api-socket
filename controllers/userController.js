const userService = require("../services/userService");
const md5 = require("md5");
var jwt = require("jsonwebtoken");
class userController {
  async register(req, res, next) {
    try {
      const { body } = req;

      const user = await userService.getOneUser({ email: body.email });

      if (user) throw new Error("User already exiting");

      body.password = md5(body.password);

      const newUser = await userService.create(body);

      return res.send({ data: newUser });
    } catch (error) {
      console.log("error", error);
    }
  }

  async login(req, res, next) {
    try {
      const { body } = req;

      const user = await userService.getOneUser({ email: body.email });

      if (!user) {
        return res.json({ message: "User not found" });
      } else if (user.password === md5(body.password)) {
        var token = jwt.sign({ id: user._id }, "shhhhh");
        return res.json({ data: user, token });
      } else {
        return res.json({ message: "password is not match" });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = new userController();
