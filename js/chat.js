const socket=io("http://localhost:8000");


const form =document.getElementById("sentItem");
const message=document.getElementById("messageInput");
const messageContainer=document.querySelector(".container");

const audio=new Audio("Ting-sound-effect.mp3");

function append(message,position){
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position=="Left"){
        audio.play();
    }
}

const name= prompt("Please enter your name to chat");

socket.emit("new-user-joined",name);

socket.on("user-joined",name=>{
    append(`${name} joined the chat`,"Left");
});

socket.on("recieve",data=>{
    append(`${data.name}: ${data.message}`,"Left");
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`,"Right");
    socket.emit("send",message);
    messageInput.value="";
});

socket.on("left",user=>{
    append(`${user} has left the chat`,"Left");
});

