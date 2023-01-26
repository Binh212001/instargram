const { newComment, deleteComment, getComment } = require('../controllers/CommentController');

const router = require('express').Router();

router.post('/comment/new', newComment);
router.delete('/comment/delete/:id', deleteComment);
router.get('/comment/:id', getComment);

module.exports = router;
