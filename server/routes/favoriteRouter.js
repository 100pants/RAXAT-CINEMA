import { Router } from 'express';
import favoriteController from '../controllers/favoriteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// Добавить фильм в избранное (только для авторизованных)
router.post('/', authMiddleware, favoriteController.add);

// Удалить фильм из избранного
router.delete('/', authMiddleware, favoriteController.remove);

// Получить все избранные фильмы пользователя
router.get('/', authMiddleware, favoriteController.getAll);

export default router;