const express = require('express');
const path = require('path');
const readJsonData = require('./fs/readFs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkerPath = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkerRead = await readJsonData(talkerPath);

  if (!talkerRead) return res.status(200).send([]);

  return res.status(200).send(talkerRead);
});

app.listen(PORT, () => {
  console.log('Online');
});
