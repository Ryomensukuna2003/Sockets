const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    socket.on("chat", (res, room) => {
        if (room === '') {
            io.emit("sending_to_client", res); // For all
        }
        else {
            io.to(room).emit("sending_to_client", res);
        }
    })
    socket.on("join", (room) => {
        socket.join(room);
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Server Listning at ${PORT}`);
})
