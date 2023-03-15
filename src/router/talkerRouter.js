const { Router } = require('express');
const path = require('path');
const fs = require('fs').promises;
const readJsonData = require('../files/readFs');
const { validation } = require('../middleware');
const { isValidToken } = require('../middleware/validateTalker');

const talkerRouter = Router();

const talkerPath = path.resolve(__dirname, '../talker.json');

talkerRouter.get('/', async (_req, res) => {
  const talkers = await readJsonData(talkerPath);

  if (!talkers) {
    return res.status(200).json([]);
  }

  return res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const talkers = await readJsonData(talkerPath);
  const { id } = req.params;

  const talkerById = talkers.find((talker) => talker.id === Number(id));

  if (!talkerById) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(talkerById);
});

talkerRouter.post('/', ...validation, async (req, res) => {
  const talkers = await readJsonData(talkerPath);
    const { name, age, talk } = req.body;
    const newTalker = {
      id: talkers[talkers.length - 1].id + 1,
      name,
      age,
      talk,
    };
    const allTalker = JSON.stringify([...talkers, newTalker], null, 2);
    await fs.writeFile(talkerPath, allTalker);
    res.status(201).json(newTalker);
});

talkerRouter.put('/:id', ...validation, async (req, res) => {
  const talkers = await readJsonData(talkerPath);
  const { name, age, talk } = req.body;

  const talkerById = talkers.find(({ id }) => id === Number(req.params.id));

  if (!talkerById) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  const indexTalker = talkers.findIndex(({ id }) => id === Number(req.params.id));
  talkers[indexTalker] = { id: Number(req.params.id), name, age, talk };

  const updatedtalkers = JSON.stringify(talkers, null, 2);
  await fs.writeFile(talkerPath, updatedtalkers);

  return res.status(200).json(talkers[indexTalker]);
});

talkerRouter.delete('/:id', isValidToken, async (req, res) => {
  const talkers = await readJsonData(talkerPath);
  const { id } = req.params;

  const indexTalker = talkers.findIndex((movie) => movie.id === Number(id));

  talkers.splice(indexTalker, 1);
  await fs.writeFile(talkerPath, JSON.stringify(talkers));

  return res.status(204).json();
});

module.exports = {
  talkerRouter,
};
