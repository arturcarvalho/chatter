const app = require("express")();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3001;

const userManager = require("./userManager")();
const messageManager = require("./messageManager")();

function rename(clientId, oldName, newName, cb) {
  // rename on userManager
  userManager.renameUser(clientId, newName);

  // change name on previous messages
  messageManager.updateName(oldName, newName);

  // send message to all saying user changed name
  messageManager.addNotification(`user ${oldName} changed name to ${newName}`);
  const messages = messageManager.getMessages();
  io.emit("chat message", messages); // sending to all

  cb(messages, newName);
}

io.on("connection", function(socket) {
  // console.log("user connected");

  socket.on("join", (clientName, cb) => {
    console.log("user joining", socket.id);
    // socket id changes with each connect (aka session)
    const userName = userManager.addUser(socket.id, clientName);
    const messages = messageManager.getMessages();

    cb(messages, userName);
  });

  socket.on("chat message", msg => {
    const userName = userManager.getUsername(socket.id);

    messageManager.addMessage(userName, msg);
    const messages = messageManager.getMessages();

    io.emit("chat message", messages); // sending to all
  });

  socket.on("reset", (oldName, cb) => {
    rename(socket.id, oldName, userManager.generateGuestName(), cb);
  });

  socket.on("rename", (oldName, newName, cb) => {
    rename(socket.id, oldName, newName, cb);
  });

  socket.on("disconnect", () => {
    userManager.removeUser(socket.id);
    console.log("user disconnected", socket.id);
  });
});

http.listen(port, function(err) {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});
