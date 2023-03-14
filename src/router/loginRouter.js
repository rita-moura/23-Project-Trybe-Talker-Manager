const { Router } = require('express');
const { isValidLogin, isValidEmailAndPassword } = require('../middleware/validateLogin');
const randomToken = require('../services/randomToken');

const loginRouter = Router();

const validation = [isValidLogin, isValidEmailAndPassword];

loginRouter.post('/', ...validation, async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const token = randomToken(16);
    return res.status(200).json({
      token: `${token}`,
    });
  }
});

module.exports = {
  loginRouter,
};