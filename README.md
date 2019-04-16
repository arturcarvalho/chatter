# Description
Chat server using React, Redux ES6/Typescript for the frontend, and socket.io and nodejs/express for the backend.

# How to start
- from the terminal, run "npm install" inside folders chatter-be and chatter-fe.
- start to start the backend server and the frontend server (ensure node is up to date)

## Start backend

Go to folder **chatter-be** and start socket.io server with:

> node index.js

## Start frontend

Go to folder **chatter-fe** and start React SPA with:

> npm start

# Notes

- This project does not represent my typical decision process. Generally I would work together with designers, backend, check the coding/testing/documentation standards.
- I've never used sockets.io before.

# Decisions

- User names can be the same.
- I'm using scss + css modules.
- Updating localstore throttled to once per second (save is an expensive operation).
- The backend and frontend were split into 2 folders/projects.
- I used Prettier.
- I left console.logs to describe what is happening.
- The websocket server will be running on the same hostname but on a different port
  (so I can access site from another PC/phone to test).
- I'm applying a new theme with css variables. The tradeoff is that I'm manipulating the DOM directly and by not using a declarative way of doing this, it doesn't fit so well with React.

## Why CRA was selected

I used create-react-app (CRA) because it is fast to start developing and it has good default values.
CRA may not be a good choice if you want good SEO or if you want to avoid the majority of the javascript at the start.

# Possible improvements

**Typescript**

The entire project could be converted to Typescript.
I haven't used Typescript a lot, but it seems very similar to the type system in C#, which I'm familiar with.
I converted one js file and one jsx file to Typescript to try it out.

**State**

The app state could have more loading states.

**Same names**

The names could be forced to be unique.

# Tasks done

- Create backend project (nodejs + sockets.io).
- Implement backend logic (connect, disconnect, join, rename, reset, message).
- Create frontend project (CRA).
- Add Chat page.
- Add Settings page.
- Make Chat page the default view.
- Store settings on Redux.
- Save Redux store (settings) to local storage.
- Store messages with Redux, but don't save messages to local storage.
- Show message list (chat bubbles).
- Sent messages float right.
- Received messages float left.
- Storage saves are throttled.
- Add inpud field and send button.
- Add timestamp to all chat bubbles.
- Add user name only to bubbles on the left.
- Show message in the top of screen indicating if server is disconnected.
- Implement reconnect logic.
- Mark selected tab by putting an underlined on selected tab.
- Show badge with unread messages count when in settings page.
- Animate (blink) badge with unread messages count.
- settings page: Add theme selector.
- Add light theme.
- Add dark theme.
- settings page: Add time format selector.
- Implement time format bubble to show 12h/24h format.
- settings page: add toggle for when to send messages with Ctrl+Enter.
- Send message when pressing Ctrl+Enter.
- settings page: Add button to restore settings to default values (defaults on settingsReducer)
- Implement user name change.
- Enable "save name" button only if user name is different from previous name.
- Show notification (middle message) showing that a user changed name.
- Focus cursor on send input box when page loaded.
- Don't let users send empty messages.
- Make scrollbar work on messages list.
- Automatically scroll messages to bottom (when message count changes OR on Chat mount).
- Test site on windows: Tested on chrome.
- Test site on mac: Tested on chrome.
- Test site on mobile: Tested on Android J7 (chrome) + iPhone 6 (safari+chrome).
