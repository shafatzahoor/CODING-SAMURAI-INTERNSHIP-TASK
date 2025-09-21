/*const socket =io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const append =(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.appendChild(messageElement)
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    console.log("You typed:", message);
    append(`You: ${message}`, 'right');

    socket.emit('send',message);
    messageInput.value =''
})

document.addEventListener("DOMContentLoaded", () => {
    const name = prompt("Enter your name to join:");
    socket.emit('new-user-joined', name);
});

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    console.log("Message received from other user:", data);    
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', name => {
    append(`${name} left the chat`, 'left');
});*/


const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio =new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
  audio.play().catch(err => {
    // Agar play fail hua toh console me error dikhao, ya ignore karo
    console.log("Audio play failed:", err);
  });

 
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
   
});

/*document.addEventListener('DOMContentLoaded', () => {
  const name = prompt('Enter your name to join:');
  socket.emit('new-user-joined', name);
});*/
window.addEventListener('click', () => {
  if (!window.userNameEntered) {
    const name = prompt('Enter your name to join:');
    if (name) {
      socket.emit('new-user-joined', name);
      window.userNameEntered = true;
    }
  }
});

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', name => {
  append(`${name} left the chat`, 'left');
});



