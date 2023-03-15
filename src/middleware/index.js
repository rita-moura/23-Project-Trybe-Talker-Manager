const { 
  isValidToken, 
  isValidName, 
  isValidAge, 
  isValidTalker,
  isValidTalkerWatchedAT,
  isValidTalkerRate,
} = require('./validateTalker');

const validation = [
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalker,
  isValidTalkerWatchedAT,
  isValidTalkerRate,
];

module.exports = {
  validation,
};