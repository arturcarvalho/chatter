module.exports = function() {
  const users = new Map(); // key: session id, value: userName
  let guestCount = 0;

  function generateGuestName() {
    guestCount++;
    const zeroFilled = ("0000" + guestCount).slice(-4);
    return `guest${zeroFilled}`;
  }

  function addUser(clientId, userName) {
    console.log("adding user", userName);
    if (!users.has(clientId)) {
      // name it guest if no username
      userName = userName || generateGuestName();

      users.set(clientId, userName);

      console.log(JSON.stringify([...users], null, 2));
      return userName;
    }
  }

  function removeUser(clientId) {
    if (users.has(clientId)) {
      users.delete(clientId);
    }
  }

  function renameUser(clientId, newName) {
    if (users.has(clientId)) {
      users.set(clientId, newName);
    }
  }

  function getUsername(clientId) {
    if (users.has(clientId)) {
      return users.get(clientId);
    }
  }

  return {
    addUser,
    removeUser,
    generateGuestName,
    renameUser,
    getUsername
  };
};
