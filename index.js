const express = require('express');
const mongoose = require('mongoose');
const dotevn = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const batchRoute = require('./routes/batch');
const imageRoute = require('./routes/image');
const roomRoute = require('./routes/room');
const cookieParser = require('cookie-parser');
const app = express();
const httpServer = createServer(app);  // Create HTTP server
const io = new Server(httpServer);     // Attach socket.io to HTTP server

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
app.use('/batch', batchRoute);
app.use('/image', imageRoute);
app.use('/room', roomRoute(io));

httpServer.listen(3000);

