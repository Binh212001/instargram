const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes');
const cors = require('cors');
const path = require('path');

const morgan = require('morgan');

const app = express();
app.use(express.json({ urlencoded: true }));
app.use(morgan('combined'));
app.use(cors());
route(app);

app.use('/public/images', express.static(path.join(__dirname, '/public/images')));

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://binh:Binh0987272867@social-media.gzw1me0.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Connected');
  });

app.listen(4000, () => {
  console.log('My server is running');
});
