import { Router } from 'express';
import commentController from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkAdminMiddleware from '../middleware/checkAdminMiddleware.js';

const router = Router();

// Добавить комментарий (авторизованные)
router.post('/', authMiddleware, commentController.add);

// Удалить комментарий (только админ или автор)
router.delete('/:id', authMiddleware, checkAdminMiddleware, commentController.remove);

// Получить все комментарии к фильму
router.get('/:kinopoiskId', commentController.getByMovie);

export default router;