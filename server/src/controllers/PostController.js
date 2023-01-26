const { response } = require('express');
const { default: mongoose } = require('mongoose');
const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// @@@@@New post
const newPost = async (req, res) => {
  console.log(req.body);
  const { userId, description } = req.body;
  try {
    const isUser = await User.findById(userId);
    if (!isUser || !description) {
      return res.status(400).json({ message: 'New post fail' });
    }
    const newPost = new Post(req.body);
    await newPost.save();
    return res.json({
      message: 'New post successfully',
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'New post Err',
    });
  }
};

// @@@@@ Like and Dislike Post
const likePost = async (req, res) => {
  const post = req.params.id;
  const { userLike } = req.body;
  try {
    const postLike = await Post.findById(post);
    const user = postLike.like.find((x) => x === userLike);
    if (user) {
      const unLike = await Post.updateOne(
        { _id: mongoose.Types.ObjectId(post) },
        {
          $pull: {
            like: userLike,
          },
        },

        { new: true },
      );
      res.json({
        message: 'UnLike',
        like: unLike,
      });
    } else {
      const like = await Post.updateOne(
        { _id: mongoose.Types.ObjectId(post) },
        {
          $push: {
            like: userLike,
          },
        },
        { new: true },
      );
      res.json({
        message: 'UnLike',
        like: like,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: ' Like function is errored ',
    });
  }
};

// @@@ Get List Post

const getListPost = async (req, res) => {
  try {
    let post = await Post.aggregate([
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

    let postList = [];
    post.map((data) => {
      const username = data.author[0].username;
      const avatar = data.author[0].avatar;
      const { author, ...others } = data;
      postList.push({ ...others, username, avatar });
    });

    return res.json({
      post: postList,
    });
  } catch (error) {
    res.status(500).json({
      message: 'get List Post Error',
    });
  }
};

// @@@ Delete Post

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    return res.json({
      message: 'Deleted',
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'get List Post Error',
    });
  }
};

module.exports = {
  newPost,
  likePost,
  getListPost,
  deletePost,
};
