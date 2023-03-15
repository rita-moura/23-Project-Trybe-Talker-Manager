const fs = require('fs').promises;

const readJsonData = async (path) => {
    try {
        const data = await fs.readFile(path);
        return JSON.parse(data);
    } catch (e) {
        const error = new Error('Erro ao ler arquivo');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = readJsonData;