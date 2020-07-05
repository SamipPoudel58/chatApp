// let socket = io.connect("http://localhost:4000");
let socket = io();

const handle = document.getElementById("handle");
(message = document.getElementById("message")),
  (btn = document.getElementById("send")),
  (output = document.getElementById("output")),
  (feedback = document.getElementById("feedback"));
let win = document.querySelector("#chat-window");

// Emit the inputs(message) to the server
btn.addEventListener("click", sendMsg);

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    sendMsg();
  }
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

function sendMsg() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
}

// listen for events
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
  win.scrollTo(0, win.scrollHeight - win.clientHeight);
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
  win.scrollTo(0, win.scrollHeight - win.clientHeight);
});
