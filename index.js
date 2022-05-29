const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const socketIo = require('socket.io');
const port = process.env.PORT;

app.use(cors());
app.use('/', express.static(path.join(__dirname)))

const server = app.listen(port, ()=>{
    console.log("Running");
})

const messages = []

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New Connection')
    socket.emit('update_messages', messages);

    socket.on('new_message', (data) => {
        messages.push(data);

        io.emit('update_messages', messages);
    })
})