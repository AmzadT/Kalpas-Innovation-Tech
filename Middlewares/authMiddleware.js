const jwt = require('jsonwebtoken');
const { getMessage } = require('../Utils/messages');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const lang = req.headers['accept-language'] || 'en';

  if (!token) {
    return res.status(401).json({ message: getMessage('auth_required', lang) });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: getMessage('invalid_token', lang) });
  }
};

module.exports = authMiddleware;
