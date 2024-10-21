const express = require('express');
const mongoose = require('mongoose');
const dotevn = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const app = express();

dotevn.config();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    w: "majority",  // Write concern
    wtimeoutMS: 5000  // Optional write concern timeout in milliseconds
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

app.get('/', function(req, res){
    res.send("hi!");
})

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.listen(3000);