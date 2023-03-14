const { Router } = require('express');
const randomToken = require('../services/randomToken');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
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