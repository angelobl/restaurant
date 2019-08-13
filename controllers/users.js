const _ = require("lodash");
const usersModel = require("../models/users");
const listUser = [];

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
