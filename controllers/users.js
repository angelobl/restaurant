const _ = require("lodash");
const usersModel = require("../models/users");
//const listUser = [];

class User {
  list() {
    return new Promise((resolve, reject) => {
      usersModel
        .find({}, { password: 0 })
        .then(result => resolve(result), err => reject(err));

      /* usersModel.find(
        {},
        {password: 0},
        (err,result) => {
          if (err) return reject(err);
          return resolve(result);
        }
      )*/
    });
  }

  async deleteUser(userId) {
    //return await usersModel.deleteOne({_id:`ObjectId("${userid}")`});
    return await usersModel.findByIdAndDelete(userId);
  }

  async updateUser(userId, body) {
    return await usersModel.findByIdAndUpdate(userId, body);
  }

  async listUser(userId) {
    //return await usersModel.find({_id:`ObjectId(${userId})`},{})
    return await usersModel.findById(userId);
  }

  async store(name, lastname, email, password) {
    //const { name, lastname } = req.body;
    return await usersModel.create({
      name,
      lastname,
      email,
      password
    });
  }
}
module.exports = new User;
