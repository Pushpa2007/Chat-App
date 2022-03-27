//node server which will handle socket io connections
//const io=require('socket.io')(8000)
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};
io.on('connection',socket=>{
socket.on('new-user-joined', names =>{
    console.log("New user:",names);
    users[socket.id]=names;
    socket.broadcast.emit('user-joined', names)
});
//console.log("connected");
socket.on('send',message =>{
    socket.broadcast.emit('receive',{message: message, names :users[socket.id]})
});
socket.on('disconnect',message =>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
});
})