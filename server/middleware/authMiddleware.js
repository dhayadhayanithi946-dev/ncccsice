const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token, access denied' });
  }

  const token = authHeader.split(' ')[1] || authHeader;
  if (!token) {
    return res.status(401).json({ error: 'Token format invalid, access denied' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'csice_ncc_secret_key_2026_super_secure_token';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or expired' });
  }
};

module.exports = authMiddleware;
