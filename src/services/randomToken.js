function randomToken(length) {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let counter = 0;
    while (counter < length) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
      counter += 1;
    }
    return result;
}

module.exports = randomToken;
