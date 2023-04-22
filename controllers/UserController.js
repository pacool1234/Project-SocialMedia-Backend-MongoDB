const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');
const transporter = require('../config/nodemailer');

const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: password });
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' });
      const url = `http://localhost:8080/users/confirm/${emailToken}`;
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirmation email',
        html: `<h3>Welcome, you are one step away from registering</h3>
        <a href='${url}'>Click to confirm your email</a>
        <p>Confirme su correo en 48 horas</p>`
      });
      res.status(201).send({ message: 'User created', user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'There was a problem when creating new user' });
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      await User.updateOne(
        { email: payload.email },
        { confirmed: true }
      );
      res.status(201).send({ message: 'User confirmed' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ message: 'Incorrect user/password' });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: 'Email must be confirmed first' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Incorrect user/password' });
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      await User.updateOne(
        { email: req.body.email },
        { $push: { tokens: token }},
        { new: true }
      );
      res.send({ token, message: `Welcome ${user.username}`, user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
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
};

module.exports = UserController;