var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();
redis.psubscribe('private-active-device.*', function(err, count) {});
redis.on('message', function(channel, message) {
    message = JSON.parse(message);

    console.log('Message channel: ' + channel);
    console.log('Message Recieved: ' + message.event);
    console.log('Message Recieved: ' + message);

    io.emit(channel + ':' + message.event, message.data, send_to_self = false);
    // io.sockets.on("connect", (socket) => {
    //     console.log('connect', socket)
    //     socket.broadcast.emit(channel + ':' + message.event, message.data, send_to_self = false);
    // })


});


redis.on('pmessage', function(pattern, channel, message) {
    message = JSON.parse(message);
    console.log('pattern', pattern);
    console.log('pmessage', channel);
    console.log('Message Recieved pmessage: ' + message.event);

    io.emit(channel + ':' + message.event, message.data);
    io.in(channel).emit(channel + ':' + message.event, message.data);
    // io.in(channel).emit(channel + ':' + message.event, message.data)
    // io.sockets.on("connection", (socket) => {
    //     console.log('connect', socket)
    //     socket.broadcast.emit(channel + ':' + message.event, message.data, send_to_self = false);
    // })
    // io.sockets.in(channel).emit(message.event, message.data)


});


io.on("connection", (socket) => {


    socket.on('private-active-device.3', (
        room
    ) => {

        socket.join(room);
        socket.emit("message", `join  Welcome to ChatCord! ${room}`);
        socket.broadcast
            .to(room)
            .emit(
                "message",
                `${socket.id} has joined the chat`);

    });




    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = socket.id

        if (user) {
            io.to('private-active-device.3').emit(
                "message",
                `${socket.id} has left the chat`
            );

            // Send users and room info
            // io.to(room).emit("roomUsers", {
            //     room: user.room,
            //     users: getRoomUsers(user.room),
            // });
        }
    });
});

http.listen(3000, function() {
    console.log('Listening on Port 3000');
});