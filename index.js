const express = require('express');
const mongoose = require('mongoose');
const dotevn = require('dotenv');
const authRoute = require('./routes/auth');
const app = express();

dotevn.config();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

app.get('/', function(req, res){
    res.send("hi!");
})

app.use('/auth', authRoute);

app.listen(3000);