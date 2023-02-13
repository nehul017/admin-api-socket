const userModel = require("../models/userModel");

class userService {
  async create(model) {
    return userModel.create(model);
  }

  async getOneUser(where = {}) {
    return userModel.findOne(where);
  }

  async getUserById(id) {
    return userModel.findById(id);
  }
}

module.exports = new userService();
