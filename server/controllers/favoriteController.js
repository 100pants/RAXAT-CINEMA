import { Favorite, User } from '../models/models.js';

class FavoriteController {
    // Добавить фильм в избранное
    async add(req, res) {
        try {
            const { kinopoiskId } = req.body;
            const userId = req.user.id; // Из токена (authMiddleware)

            // Проверяем, не добавлен ли уже фильм
            const existing = await Favorite.findOne({ where: { userId, kinopoiskId } });
            if (existing) {
                return res.status(400).json({ message: 'Фильм уже в избранном' });
            }

            // Создаём запись
            const favorite = await Favorite.create({ userId, kinopoiskId });
            return res.json(favorite);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // Удалить фильм из избранного
    async remove(req, res) {
        try {
            const { kinopoiskId } = req.body;
            const userId = req.user.id;

            await Favorite.destroy({ where: { userId, kinopoiskId } });
            return res.json({ message: 'Фильм удалён из избранного' });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // Получить все избранные фильмы пользователя
    async getAll(req, res) {
        try {
            const userId = req.user.id;
            const favorites = await Favorite.findAll({ where: { userId } });
            return res.json(favorites);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

export default new FavoriteController();