import io from "socket.io-client";

// Assuming that backend and frontend on same hostname
const hostname = window.location.hostname;
const socketPort = 3001;
const socket = io(`${hostname}:${socketPort}`);

/**
 * Callback to sync web app state with username and messages from the server.
 *
 * @callback serverSyncCallback
 * @param {Object[]} messages - Messages.
 * @param {string} serverName - User name from the server.
 */

/**
 * @callback warningCallback
 * Show a warning message on the top of the screen
 *
 * @param {bool} val - true to show warning, false otherwise
 * @param {*} cb
 */

// ON

/**
 * Triggers when user connects to chat server.
 *
 * @param {string} userName - The name of the user joining the chat.
 * @param {serverSyncCallback} cb - The callback that updates the state of the web app.
 * @param {warningCallback} cb - The callback that warns in case the server disconnects.
 */
const onConnect = (userName, syncCb, warnCb) => {
  socket.on("connect", () => {
    console.log("Connected to server");
    warnCb(false)
    joinServer(userName, syncCb);
    onDisconnect(warnCb);
  });
};

/**
 * Triggers when user disconnects from chat server.
 * @param {warningCallback} cb - The callback that warns in case the server disconnects.
 */
const onDisconnect = warnCb => {
  socket.on("disconnect", () => {
    warnCb(true);
    console.log("Disconnected from the server");
  });
};

/**
 * Triggers when user receives messages from the server.
 * @param {*} cb - The callback that updates the state of the web app.
 */
const onNewMessages = cb => {
  socket.on("chat message", cb);
};

// EMIT

/**
 *
 * @param {string} userName - The name of the user joining the chat.
 * @param {serverSyncCallback} cb - The callback that updates the state of the web app.
 */
const joinServer = (userName, cb) => {
  console.log(`${userName} joined server`);
  // send local name to server. if name empty, get unique guest name from server
  socket.emit("join", userName, cb);
};

/**
 * Rename user from *oldName* to *newName*.
 *
 * @param {string} oldName - Users' old name.
 * @param {string} newName - Users' new name.
 * @param {serverSyncCallback} cb - The callback that updates the state of the web app.
 */
const renameUser = (oldName, newName, cb) => {
  socket.emit("rename", oldName, newName, cb);
};

/**
 * Send message from current user to server.
 * @param {string} message - Message sent to server
 */
const sendMessage = message => {
  socket.emit("chat message", message);
};

/**
 * Reset name on server and get a guest name.
 * @param {string} oldName - old user name.
 * @param {serverSyncCallback} cb - The callback that updates the state of the web app.
 */
const reset = (oldName, cb) => {
  socket.emit("reset", oldName, cb);
};

export default {
  reset,
  onConnect,
  onNewMessages,
  sendMessage,
  renameUser
};
