import React, { useEffect, useState } from "react";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import moment from "moment";
import ChatForm from "./ChatForm";
import Selected from "./Selected";
import "./Chat-Shell.css";
import ChatSocketServer from "./utils/chatSocketServer";
import ChatHttpServer from "./utils/chatHttpServer";
import ObjectId from "bson-objectid";
import Badge from "../chat/notificationBadge";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const ChatShell = (props) => {
  const {
    location: { selectedChatUser },
  } = props;

  // const { _id: userId, businessName: userName, avatarUrl } = JSON.parse(
  //   localStorage.getItem("posts")
  // )?.posts?.profile[0];

  const [userId] = useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]._id
  );

  const [userName] = useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0].businessName
  );

  const [avatarUrl] = useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0].avatarUrl
  );

  const [selectedChat, setSelectedChat] = useState({
    name: "",
    businessId: "",
    chatId: "",
  });

  const [messageList, setMessageList] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMoreMsgs, setHasMoreMsgs] = useState(false);

  const [chats, setChats] = useState(
    selectedChatUser ? [{ ...selectedChatUser }] : []
  );

  useEffect(() => {
    ChatSocketServer.establishSocketConnection(userId);
    ChatSocketServer.receiveMessage();
    ChatSocketServer.receiveMessageUpdates();
    ChatSocketServer.receiveTypingUpdate();
    ChatSocketServer.receiveChat();
  }, [userId]);

  useEffect(() => {
    ChatSocketServer.getChatList({ userId, searchQuery });
  }, [userId, searchQuery]);

  useEffect(() => {
    const handleChatList = ({ error, chatList }) => {
      if (error) alert("Failed to retrieve chats");
      else {
        let initialSelectedChat = {};

        if (selectedChatUser) {
          initialSelectedChat = chatList?.find(
            (chat) => selectedChatUser.businessId === chat.businessId
          );

          if (initialSelectedChat) {
            setSelectedChat({
              ...initialSelectedChat,
              businessId: initialSelectedChat.businessId,
              chatId: initialSelectedChat.chatId,
            });
            setChats(chatList);
          } else {
            setSelectedChat({
              ...selectedChatUser,
            });

            if (typeof chatList !== "undefined") {
              setChats([...chats, ...chatList]);
            }
          }
        } else {
          if (typeof chatList !== "undefined") {
            setChats(chatList);
          }
        }
      }
    };
    ChatSocketServer.eventEmitter.on("chat-list-response", handleChatList);

    return () => {
      return ChatSocketServer.eventEmitter.removeListener(
        "chat-list-response",
        handleChatList
      );
    };
  }, [chats, selectedChatUser, userId]);

  const sendMessage = async (data = null) => {
    // Create document IDs locally
    let msgId = ObjectId().str;
    let chatId = ObjectId().str;
    // If we are passing data then we are perfoming an upload
    let fileList =
      data !== null
        ? [
            {
              ...data,
              originalName: data.file.name,
              size: data.file.size,
              type: data.file.type,
            },
          ]
        : [];

    // Message sent to new contact
    setMessageList([
      ...messageList,
      {
        _id: msgId,
        createdAt: moment(),
        chatId: chatId,
        senderId: userId,
        senderAvatarUrl: avatarUrl,
        receiverId: selectedChat.businessId,
        message: !data ? newMessage : "📎 file",
        state: "SENT",
        files: fileList,
      },
    ]);

    // If the selected contact is not associated with a chat document
    // Create a new chat document
    // With initial message
    if (!selectedChat.chatId) {
      ChatSocketServer.addChat({
        clientOneId: userId,
        clientTwoId: selectedChat.businessId,
        chatId,
        message: {
          _id: msgId,
          senderName: userName,
          text: !data ? newMessage : "📎 file",
          files: fileList,
          senderAvatarUrl: avatarUrl,
        },
      });

      // setNewMessage("");

      // Update selected chat chatId
      setSelectedChat({ ...selectedChat, chatId });
    } else if (
      (newMessage === "" || newMessage === undefined || newMessage === null) &&
      !data
    ) {
      console.log(`Message can't be empty.`);
    } else if (!selectedChat.businessId) {
      console.log(`Select a user to chat.`);
    } else {
      sendAndUpdateMessages({
        _id: msgId,
        createdAt: moment(),
        chatId: selectedChat.chatId,
        senderName: userName,
        senderId: userId,
        receiverId: selectedChat.businessId,
        message: !data ? newMessage : "📎 file",
        files: fileList,
        senderAvatarUrl: avatarUrl,
      });
    }

    setNewMessage("");

    // Update chat message
    const chatList = chats.filter((chat) => {
      if (chat.businessId === selectedChat.businessId) {
        chat.messages[0] = {
          _id: msgId,
          createdAt: moment(),
          chatId: selectedChat.chatId ? selectedChat.chatId : chatId,
          senderName: userName,
          senderId: userId,
          receiverId: selectedChat.businessId,
          message: !data ? newMessage : "📎 file",
          state: "SENT",
          files: fileList,
          senderAvatarUrl: avatarUrl,
        };
        chat.chatId = selectedChat.chatId ? selectedChat.chatId : chatId;
      }
      return chat;
    });

    setChats([...chatList]);
  };

  const sendAndUpdateMessages = (message) => {
    try {
      ChatSocketServer.sendMessage(message);
      setMessageList([...messageList, { ...message, state: "SENT" }]);

      setNewMessage("");
    } catch (error) {
      console.log(`Can't send your message`);
    }
  };

  const handleChange = (value) => {
    setNewMessage(value);

    ChatSocketServer.setTyping({
      senderId: userId,
      receiverId: selectedChat.businessId,
    });
  };

  const [offsetIndex, setOffsetIndex] = useState(0);

  useEffect(() => {
    setLoadingMessages(true);
    const getMessages = async () => {
      if (selectedChat.chatId) {
        const messageResponse = await ChatHttpServer.getMessages(
          selectedChat.chatId,
          offsetIndex
        );
        if (!messageResponse.error) {
          const oldMessageCount =
            messageResponse.messageCount[0].count - 10 * (offsetIndex + 1);

          if (oldMessageCount > 0) setHasMoreMsgs(true);
          else setHasMoreMsgs(false);
          let response = messageResponse.messageList.reverse();
          setMessageList([...response, ...messageList]);
        } else {
          alert("Unable to fetch messages");
        }
      }
      setLoadingMessages(false);
    };

    getMessages();
  }, [offsetIndex, selectedChat]);

  const handleChatSelect = (chat) => {
    if (chat.chatId !== selectedChat.chatId) {
      setMessageList([]);
      setOffsetIndex(0);
      setSelectedChat(chat);
    }
  };

  return (
    <div className="coverpage">
      <div style={{ height: 122, width: "100%" }} className="reversec">
        <div style={{ paddingLeft: "18%", width: "62%" }}>
          <input
            placeholder="Search"
            type="text"
            className="search"
            name="search"
            noValidate
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="badge">
          <Link to="/inbox">
            <Badge />
          </Link>
          <div>
            <Avatar
              style={{ height: 50, width: 50, top: 10, left: 92, right: 2 }}
              src={avatarUrl}
              alt={"R"}
            />
            <div className="rate">
              <a
                href="CompanyProfile"
                style={{
                  fontSize: "13px",
                  marginTop: 10,
                  height: 1,
                  paddingLeft: 70,
                }}
              >
                Profile{" "}
              </a>
              <p style={{ fontSize: "13px", height: 1, paddingLeft: 5 }}>|</p>
              <a
                href="loginout"
                style={{ fontSize: "13px", marginTop: 10, paddingLeft: 5 }}
              >
                {" "}
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="chat-container">
        <ConversationList
          selectedChat={selectedChat}
          userId={userId}
          setChats={setChats}
          handleChatSelect={handleChatSelect}
          chatList={chats}
          setMessageList={setMessageList}
        />
        <div id="search-container">
          <p> </p>
        </div>
        <Selected selectedChat={selectedChat} />
        <ChatForm
          handleChange={handleChange}
          handleSend={sendMessage}
          newMessage={newMessage}
          selectedChat={selectedChat}
        />

        <MessageList
          selectedChat={selectedChat}
          messageList={messageList}
          setMessageList={setMessageList}
          loadingMessages={loadingMessages}
          setOffsetIndex={setOffsetIndex}
          hasMoreMsgs={hasMoreMsgs}
          offsetIndex={offsetIndex}
        />
      </div>
    </div>
  );
};

export default ChatShell;
