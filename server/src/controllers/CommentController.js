const { aggregate } = require('../models/Comment');
const Comment = require('../models/Comment');

const newComment = async (req, res) => {
  const { userId, postId, text } = req.body;
  try {
    if (!userId || !postId || !text)
      return res.status({
        message: ' Comment invalid',
      });
    const comment = new Comment({ userId, postId, text });
    await comment.save();
    return res.json({
      comment,
      message: 'Yours Comment ',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'New Comment BackEnd Err Server',
    });
  }
};

// @@@@ delete comment

const deleteComment = async (req, res) => {
  try {
    const commentDelete = await Comment.findByIdAndDelete(req.params.id);
    return res.json({
      comment: commentDelete,
      message: 'Deleted',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Delete Comment BackEnd Err',
    });
  }
};

// @@@@ Get comment of post

const getComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          postId: id,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { pid: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', { $toObjectId: '$$pid' }],
                },
              },
            },
          ],
          as: 'author',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    let commentList = [];
    comments.map((cm) => {
      const username = cm.author[0].username;
      const avatar = cm.author[0].avatar;
      const { author, ...others } = cm;
      commentList.push({ ...others, username, avatar });
    });
    return res.status(200).json({
      comment: commentList,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Get comment back end Error',
    });
  }
};
module.exports = { newComment, deleteComment, getComment };
