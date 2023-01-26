const multer = require('multer');
const router = require('express').Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images');
  },
  filename: function (req, file, cb) {
    console.log('🚀 ~ file: multer.js:8 ~ file', req.body);
    cb(null, req.body.fileName);
  },
});
const upload = multer({ storage: storage });

router.post('/upload/image', upload.single('post'), (req, res) => {
  try {
    return res.status(200).json('File upload successfully');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
