import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/models.js';
import ApiError from '../error/apiError.js';

const generateJwt = (id, email, login, role) => {
    return jwt.sign(
        { id, email, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res, next) {
        try {
            const { email, login, password } = req.body;
            
            if (!email || !login || !password) {
                return next(ApiError.badRequest('Все поля обязательны'));
            }
            
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.badRequest('Пользователь уже существует'));
            }
            
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, login, password: hashPassword });
            
            const token = generateJwt(user.id, user.email, user.login, user.role);
            return res.json({ token });
            
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }
            
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'));
            }
            
            const token = generateJwt(user.id, user.email, user.login, user.role);
            return res.json({ token });
            
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.login, req.user.role);
        return res.json({ token });
    }
}

export default new UserController();