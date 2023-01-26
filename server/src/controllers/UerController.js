const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');

const SecretKey = 'Im a dog';
// @@@@login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const currentUser = await User.findOne({ username });
    if (currentUser) {
      const decodePassword = await bcrypt.compare(password, currentUser.password);
      if (decodePassword) {
        const token = jwt.sign({ username, password }, SecretKey);

        return res.json({
          token,
          user: currentUser,
        });
      }
    } else {
      return res.status(400).json({
        message: 'Username or Password  invalid',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Username or Password  invalid',
    });
  }
};

// @@@@Register
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await User.find({
      username,
    });
    if (oldUser._id) return res.status(400).json({ message: 'User is exit' });
    const hashPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ username, password }, SecretKey);
    const newUser = new User({
      username,
      password: hashPassword,
    });
    console.log(newUser);
    await newUser.save();
    return res.json({
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Register Err',
    });
  }
};

// @@@I follow person
const getFriend = async (req, res) => {
  const { id } = req.params;
  try {
    const allUser = await User.find({});
    const myUser = await User.findById(id);
    //user da follow
    const userFollower = myUser.Followers.map((item) => item);
    const followers = allUser.filter((user) => {
      return userFollower.find((data) => {
        // Neu user trong  all user co _id bang data(uer da follow)  tra ve true
        return user._id.toString() === data;
      });
    });
    let followerList = [];
    followers.map((fr) => {
      const { password, ...others } = fr._doc;
      followerList.push(others);
    });
    return res.status(200).json(followerList);
  } catch (error) {
    res.status(500).json({ message: 'Get Follower list Err' });
  }
};

// @@@People follow me
const followMe = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const following = user.Following.map(async (item) => {
      return await User.findById(item);
    });

    return res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: 'Get people follow me  Err' });
  }
};

// @@@follow

const follow = async (req, res) => {
  const myUser = await User.findById(req.params.myId);
  console.log('🚀 ~ file: UerController.js:105 ~ follow ~ myUser', myUser);

  if (req.body.id === req.params.myId) {
    return res.status(400).json({
      message: 'Can not follow yourself',
    });
  }

  const isFollow = myUser.Followers.find((x) => {
    return x === req.body.id;
  });

  if (isFollow) {
    const follow = await User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.myId) },
      {
        $pull: {
          Followers: req.body.id,
        },
      },
      {
        new: true,
      },
    );
    return res.json({
      message: 'UnFollow',
      user: follow,
    });
  } else {
    const follow = await User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.myId) },
      {
        $push: {
          Followers: req.body.id,
        },
      },
      {
        new: true,
      },
    );
    return res.json({
      message: 'Follow',
      user: follow,
    });
  }
};

const getStranger = async (req, res) => {
  try {
    const allUser = await User.find();
    console.log('🚀 ~ file: UerController.js:154 ~ getStranger ~ allUser', allUser);
    const user = await User.findById(req.params.id);
    const followinguser = await Promise.all(
      user.Followers.map((item) => {
        return item;
      }),
    );
    let UserToFollow = allUser.filter((val) => {
      return !followinguser.find((item) => {
        return val._id.toString() === item;
      });
    });

    let filteruser = await Promise.all(
      UserToFollow.map((item) => {
        const { password, ...others } = item._doc;
        return others;
      }),
    );

    res.status(200).json(filteruser);
  } catch (error) {}
};
module.exports = {
  login,
  register,
  getFriend,
  followMe,
  getStranger,
  follow,
};
