const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'failed',
      message: 'Missing or invalid Authorization header',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid or expired access token',
    });
  }
};

module.exports = authMiddleware;