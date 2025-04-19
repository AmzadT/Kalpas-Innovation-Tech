const { getMessage } = require('../Utils/messages');

const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const lang = req.headers['accept-language'] || 'en';

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: getMessage('unauthorized', lang) });
    }

    next();
  };
};

module.exports = roleMiddleware;
