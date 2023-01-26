const { newPost, likePost, getListPost, deletePost } = require('../controllers/PostController');
const VerifyToken = require('../middlewares/VerifyToken');

const router = require('express').Router();

router.get('/post/', VerifyToken, getListPost);
router.post('/post/new', VerifyToken, newPost);
router.delete('/post/delete/:id', VerifyToken, deletePost);
router.put('/post/like/:id', VerifyToken, likePost);

module.exports = router;
