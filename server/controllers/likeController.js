import { Like } from '../models/models.js';
import ApiError from '../error/ApiError.js';

export const setLike = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    const existing = await Like.findOne({ where: { userId, movieId } });
    
    if (existing) {
      if (existing.isLike) {
        await existing.destroy();
      } else {
        existing.isLike = true;
        await existing.save();
      }
    } else {
      await Like.create({ userId, movieId, isLike: true });
    }

    const likesCount = await Like.count({ where: { movieId, isLike: true } });
    const dislikesCount = await Like.count({ where: { movieId, isLike: false } });

    res.json({ likes: likesCount, dislikes: dislikesCount });
  } catch (e) {
    next(ApiError.internal(e.message));
  }
};

export const setDislike = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    const existing = await Like.findOne({ where: { userId, movieId } });
    
    if (existing) {
      if (!existing.isLike) {
        await existing.destroy();
      } else {
        existing.isLike = false;
        await existing.save();
      }
    } else {
      await Like.create({ userId, movieId, isLike: false });
    }

    const likesCount = await Like.count({ where: { movieId, isLike: true } });
    const dislikesCount = await Like.count({ where: { movieId, isLike: false } });

    res.json({ likes: likesCount, dislikes: dislikesCount });
  } catch (e) {
    next(ApiError.internal(e.message));
  }
};

export const getLikes = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user?.id;

    const likes = await Like.count({ where: { movieId, isLike: true } });
    const dislikes = await Like.count({ where: { movieId, isLike: false } });
    const userReaction = userId 
      ? await Like.findOne({ 
          where: { userId, movieId },
          attributes: ['isLike']
        })
      : null;

    res.json({
      likes,
      dislikes,
      userReaction: userReaction?.isLike ?? null
    });
  } catch (e) {
    next(ApiError.internal(e.message));
  }
};