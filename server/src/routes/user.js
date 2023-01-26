const {
  login,
  register,
  getFriend,
  followMe,
  follow,
  getStranger,
} = require('../controllers/UerController');
const VerifyToken = require('../middlewares/VerifyToken');

const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.get('/following/:id', VerifyToken, getFriend);
router.get('/follower/:id', VerifyToken, followMe);
router.put('/follow/:myId', follow);
router.get('/stranger/:id', getStranger);

module.exports = router;
