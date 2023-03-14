const isValidLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  return next();
};

const isValidEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  const emailValid = /\S+@\S+\.\S+/;

  if (!emailValid.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  return next();
};

module.exports = {
  isValidLogin,
  isValidEmailAndPassword,
};