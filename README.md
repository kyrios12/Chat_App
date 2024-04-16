# Gossips_App
This chat application provides basic messaging functionality along with features like emojis, mentions, and message likes. Enjoy Your talk with strangers.

### Tech Stack:

1. **Frontend**:
   
   - React.js: A JavaScript library for building user interfaces.
   - React Hooks: Used for state management and side-effects handling.
   - FontAwesome: For rendering icons in the user interface.
   - Emoji-Mart: Library for emoji picker functionality.
   - React Bootstrap: Provides UI components for React applications.
   - CSS: Styling language for customizing the appearance of components.

3. **Backend**:
   
   - Socket.io: Enables real-time, bidirectional communication between the client and server.
   - Express.js: A web application framework for Node.js used for building the server.
   - Node.js: A JavaScript runtime environment for executing JavaScript code server-side.

4. **Others**:
   
   - @lyket/react: Library for implementing like buttons.
   - @emoji-mart/data: Emoji dataset used by Emoji-Mart.
   - @fortawesome/free-solid-svg-icons: Free icons used from FontAwesome.

### Development Environment:

- Code Editor: Used to write and edit the code files (e.g., Visual Studio Code, Atom).
- Package Manager: Used for managing project dependencies (e.g., npm or yarn).
- Git: Version control system for tracking changes in the codebase.
- GitHub: Platform for hosting the project repository and collaboration.

## Features

1. **Socket.io Integration**: The app uses Socket.io to establish a real-time bidirectional communication between the client (browser) and the server. It connects to the server using `io.connect("http://localhost:8080")`.

2. **State Management**: It utilizes React's state management (`useState` and `useEffect`) to manage dynamic data such as messages, input values, mentioned users, and the visibility of the emoji picker.

3. **Sending Messages**: Users can type messages in the textarea input field and send them by clicking on the paper plane icon (`<FontAwesomeIcon icon={faPaperPlane} />`) or by pressing the Enter key. Messages are sent to the server via Socket.io's `emit` function.

4. **Displaying Messages**: Received messages are displayed in the chat interface along with the sender's name, message content, and timestamp. The messages are dynamically rendered based on the state stored in `messages`.

5. **Emoji Picker**: Users can select emojis to include in their messages by clicking on the smiley face icon (`<FontAwesomeIcon icon={faFaceSmile} />`). The emoji picker is displayed when the icon is clicked, and it disappears when clicked again.

6. **Mentions Feature**: When a user types "@" followed by a part of a username, the app suggests matching usernames from the `user_list` array. Users can click on a suggested username to automatically complete the mention in the message input field.

7. **Like Button**: Each message has a like button (`<LikeButton />`) that users can click to increment the like count for that message. However, there seems to be an issue with the implementation of the like count incrementation, as indicated in the comments. The function `handleLikeCount` is supposed to handle this functionality.

8. **Styling**: The app applies CSS styles to format the chat interface, messages, input field, emoji picker, and mention list for a visually appealing user experience.

9. **Cleanup**: The `useEffect` hook is used for subscribing to socket events and performs cleanup by unsubscribing from the events when the component unmounts.

## Getting Started

1. Clone the repository: (https://github.com/kyrios12/Chat_App)
2. Project live Demo: Pending
3. Navigate to the project directory and extract the files.
4. Run `npm install` to install the required packages.
5. Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## High-Level Design

![image](https://github.com/kyrios12/Chat_App/assets/103828615/85335ab2-4479-4cd1-a489-6e179e2174b4)

## Low-Level Design
![image](https://github.com/kyrios12/Chat_App/assets/103828615/c8b3b69a-c04b-4060-adbf-bb47ff779257)

### Home Page
![image](https://github.com/kyrios12/Chat_App/assets/103828615/de51a07b-f7b3-4682-b0f2-dcb6d590d968)

### Components


- **Input Component**: ![image](https://github.com/kyrios12/Chat_App/assets/103828615/a63c0682-a468-4c9c-bbc8-4b83a5bd5e8d)

  

- **Emoji Picker**: ![image](https://github.com/kyrios12/Chat_App/assets/103828615/de2ac758-fc51-4ab4-b369-8e9632dfeb93)

  

## Routes

- **Landing Route**: http://localhost:3000/

## Exception Handling

Exceptions are handled for scenarios like:

1. **Socket Connection Error Handling**:
   - If there's an error while connecting to the Socket.io server (`io.connect("http://localhost:8080")`). 

2. **Message Sending Error Handling**:
   - Errors might occur when attempting to send messages to the server via Socket.io's `emit` function (`socket.emit("send", newMsg)`). This is handled by implementing error first 
callbacks.

3. **Data Parsing Error Handling**:
   - Errors might occur when parsing data received from the server, especially if the data format is unexpected or invalid. Using try-catch blocks this error is handled.

4. **Input Validation**:
   - The application should validate user input, especially for critical operations like sending messages. Input validation helps prevent errors and ensures data integrity. For example, the application checks by triming the spaces in input if there is still data then only it sends otherwise message wont send.

5. **State Update Error Handling**:
   - Errors might occur when updating the application state, especially if the state changes are based on asynchronous operations or user interactions. It's important to handle state update errors gracefully to prevent application crashes and maintain a consistent user experience. The app handles these error by keeping check points and using try-catch blocks.

6. **Network Error Handling**:
   - Network errors, such as timeouts or connection failures, can occur when communicating with the server via Socket.io. The application these error by sending respective error status codes.

7. **Error Logging**:
   - Implementing error logging mechanisms can help track and debug errors that occur in the application. Used console.error to log the errors.
