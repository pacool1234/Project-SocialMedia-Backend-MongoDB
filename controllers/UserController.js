const User = require('../models/User');

const UserController = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'There was a problem when creating new user' });
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  
  async deleteAll(req, res) {
    try {
      await User.deleteMany({});
      res.send({ message: 'All users deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = UserController;