const jwt = require('jsonwebtoken');
const SecretKey = 'Im a dog';

const VerifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  try {
    const decodeToken = jwt.verify(authHeader, SecretKey);
    if (decodeToken) {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Token Invalid',
    });
  }
};

module.exports = VerifyToken;
