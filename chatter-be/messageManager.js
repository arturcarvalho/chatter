module.exports = function() {
  let messages = [
    // { name: "duderino", message: "hello", timestamp: +new Date() },
  ];

  function getMessages() {
    return messages;
  }

  function addMessage(userName, message) {
    messages.push({ name: userName, message, timestamp: +new Date() });
  }

  function addNotification(message) {
    messages.push({
      isNotification: true,
      message,
      timestamp: +new Date()
    });
  }

  function updateName(oldName, newName) {
    messages = messages.map(el => {
      if (el.name === oldName) el.name = newName;
      return el;
    });
  }
  return {
    updateName,
    addMessage,
    getMessages,
    addNotification
  };
};
