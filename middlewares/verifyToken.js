const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_COOKIE_NAME = 'token';
const TOKEN_DURATION_SECONDS = 24 * 60 * 60;
const TOKEN_DURATION_MS = TOKEN_DURATION_SECONDS * 1000;

if (!SECRET_KEY) {
    throw new Error('SECRET_KEY manquante dans les variables d environnement');
}

/**
 * Verifies the admin authentication token stored in an HTTP-only cookie.
 *
 * Public GET routes do not use this middleware. It is intended for future
 * administration routes that create, update, or delete database records.
 *
 * @param {import('express').Request} req - Express request containing cookies.
 * @param {import('express').Response} res - Express response used to refresh the auth cookie.
 * @param {import('express').NextFunction} next - Express next middleware callback.
 * @returns {void} Sends a 401 response or forwards the request.
 */
exports.verifyToken = (req, res, next) => {
    const token = req.cookies && req.cookies[TOKEN_COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ message: 'token_required' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded.user;

        const refreshedToken = jwt.sign(
            { user: decoded.user },
            SECRET_KEY,
            { expiresIn: TOKEN_DURATION_SECONDS }
        );

        res.cookie(TOKEN_COOKIE_NAME, refreshedToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: TOKEN_DURATION_MS,
        });

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'token_not_valid' });
    }
};
