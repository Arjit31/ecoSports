const express = require('express');
const router = express.Router();
const verifyUser = require('../util/verifyUser');

module.exports = function (io) {
    router.use('/', verifyUser);

    router.get('/', function (req, res) {
      res.json('room page');
      
      // Emit a message when this route is accessed
      io.emit('roomMessage', 'A new user visited the room page');
    });
  
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      // Handle joining a specific room
      socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });
  
      // Handle sending a message to a specific room
      socket.on('message', (msg) => {
        const roomId = msg.roomId; // Assuming roomId is sent with the message
        io.to(roomId).emit('message', msg.text); // Send message to everyone in the room
      });
  
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
    
    // Error handling middleware
    router.use(function (err, req, res, next) {
      res.status(500).send(err.stack);
    });
  
    return router;
};