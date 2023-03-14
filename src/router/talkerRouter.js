const { Router } = require('express');
const path = require('path');
const readJsonData = require('../files/readFs');

const talkerRouter = Router();

const talkerPath = path.resolve(__dirname, '../talker.json');

talkerRouter.get('/', async (_req, res) => {
  const talkerRead = await readJsonData(talkerPath);

  if (!talkerRead) {
    return res.status(200).json([]);
  }

  return res.status(200).json(talkerRead);
});

talkerRouter.get('/:id', async (req, res) => {
  const talkerRead = await readJsonData(talkerPath);
  const { id } = req.params;

  const talkerById = talkerRead.find((talker) => talker.id === Number(id));

  if (!talkerById) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(talkerById);
});

module.exports = {
  talkerRouter,
};
