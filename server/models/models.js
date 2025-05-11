import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

// 1. Таблица пользователей
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }, // USER или ADMIN
});

// 2. Таблица избранных фильмов
const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kinopoiskId: { type: DataTypes.INTEGER, allowNull: false }, // ID фильма из Кинопоиска
});

// 3. Таблица комментариев
const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
});

// 4. Таблица лайков/дизлайков
const Like = sequelize.define('like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movieId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    isLike: { type: DataTypes.BOOLEAN, allowNull: false } // true - like, false - dislike
  });
  
  User.hasMany(Like);
  Like.belongsTo(User);

// Связи между таблицами:
User.hasMany(Favorite);
Favorite.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

export { User, Favorite, Comment, Like };