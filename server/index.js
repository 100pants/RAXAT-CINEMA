import express from 'express';
import sequelize from './db.js';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler); // Обработка ошибок

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // Создаст таблицы, если их нет
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();