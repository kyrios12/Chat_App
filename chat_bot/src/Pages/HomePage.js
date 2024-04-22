import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Form, Image } from "react-bootstrap";
import "../Styles/Home.css";
import io from "socket.io-client";

const socket = io.connect("https://chat-app-nak8.vercel.app/");
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [mentionUsers, setMentionUsers] = useState([]);
  const [showMentionList, setShowMentionList] = useState(false);
  // const[sentMsg,setSentMsg] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleSendMessage = () => {
    let messageToSend = inputValue;
    mentionUsers.forEach((user) => {
      messageToSend = messageToSend.replace(`@${user}`, user);
    });

    if (messageToSend.trim() !== "") {
      const index = Math.floor(Math.random() * user_list.length);
      let timeArr = Date(Date.now()).split(" ");
      let timeStr = timeArr[4].substring(0, 5);

      const newMsg = {
        id: generateUniqueId(),
        name: user_list[index],
        msg: messageToSend,
        time: timeStr,
        likeCount: 0,
      };
      socket.emit("send", newMsg);
      setInputValue("");
      setMentionUsers([]); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLikeCount = (id) => {
    const message = messages.find((msg) => msg.id === id);
    message.likeCount+=1;
    console.log(message.likeCount);
    socket.emit("like", message);
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? message : msg))
    );
  };
  
  const handleEmojiPick = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.includes("@")) {
      const mention = value.substring(value.lastIndexOf("@") + 1).trim();
      const filteredUsers = user_list.filter((user) =>
        user.toLowerCase().includes(mention.toLowerCase())
      );
      setMentionUsers(filteredUsers);
      setShowMentionList(true);
    } else {
      setShowMentionList(false);
    }
  };

  const handleMentionClick = (user) => {
    setInputValue((prevMessages) => prevMessages + user);
    setShowMentionList(false);
  };
  useEffect(() => {
    socket.on("recieved_msg", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on("updateLikes", (message) => {
      setMessages((prevMessages) => {
        const index = prevMessages.findIndex((msg) => msg.id === message.id);
        if (index !== -1) {
          const updatedMessages = [...prevMessages];
          updatedMessages[index] = message;
          return updatedMessages;
        } else {
          return prevMessages;
        }
      });
    });

    return () => {
      socket.off("recieved_msg");
    };
  }, []);

  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };

  return (
    <div className="scroll_container">
      <div className="container">
        {messages.length > 0 &&
          messages.map(({ id, name, msg, time,likeCount }) => (
            <div className="msg_container" key={id}>
              <Image
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_184513.png&f=1&nofb=1&ipt=a9c68ba59ba92f4ab9f635c2938180a8874b0e978e36996c3221a1e5c5ff5170&ipo=images"
                roundedCircle
              />
              <span>
                <strong>{name}</strong>{" "}
              </span>
              <span>{time}</span>
              <div className="output">
                <span className="msg">{msg}</span>

                <span onClick={()=>handleLikeCount(id)} className="like">👍  {likeCount>0 ? `: ${likeCount}` : ''}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="send">
        <FontAwesomeIcon
          onClick={handleEmojiPick}
          icon={faFaceSmile}
          size="2x"
        ></FontAwesomeIcon>
        <div className="emoji-picker-container">
          {isPickerVisible && (
            <Picker
              data={data}
              onEmojiSelect={(e) => {
                setInputValue((prevInputValue) => prevInputValue + e.native);
              }}
            />
          )}
        </div>
        <Form.Control
          as="textarea"
          placeholder="Type Message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {showMentionList && (
          <div className="mention-list" onClick={(e) => e.stopPropagation()}>
            {mentionUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => handleMentionClick(user)}
                className="user"
              >
                {user}
              </div>
            ))}
          </div>
        )}
        <FontAwesomeIcon
          onClick={handleSendMessage}
          icon={faPaperPlane}
          size="2x"
          style={{ color: "#18191b" }}
        />
      </div>
    </div>
  );
};

export default HomePage;
