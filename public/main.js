const socket = io();
const form = document.getElementById('chat');
const input = document.getElementById('message');
const room = document.getElementById('room');
const roomButton = document.getElementById('roomButton');
const messageButton = document.getElementById('messageButton');
let joined_room = false;

socket.on("connect", () => {
    console.log("socket connected - ", socket.connected);
});

messageButton.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('chat', input.value, room.value);
    input.value = '';
});

roomButton.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('join', room.value);
});

socket.on("sending_to_client", (res) => {
    const node = document.createElement("p");
    node.className = "chat-messages-chat-text";
    const textnode = document.createTextNode("☠️ ==> " + res);
    node.appendChild(textnode);
    document.getElementById("bubbles").appendChild(node);
});
socket.on("disconnect", () => {
    console.log("Disconnected");
});

