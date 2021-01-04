import React, { useEffect, useCallback, useState } from "react";
import ConversationItem from "./ConversationItem";
import ChatSocketServer from "./utils/chatSocketServer";
import "./Conversation-List.css";

const ConversationList = ({
  handleChatSelect,
  chatList,
  setChats,
  userId,
  selectedChat,
}) => {
  const [searching, setSearching] = useState(false);

  const handleChatAdd = useCallback(
    (data) => {
      if (data.error) {
        alert(data.message);
        return;
      }
      if (chatList && data) {
        const { clients } = data;
        let chatClient;
        for (let i = 0; i < clients.length; i++) {
          if (clients[i]._id !== userId) chatClient = clients[i];
        }

        setChats([
          ...chatList,
          {
            businessId: chatClient._id,
            title: chatClient.businessName,
            imageAlt: chatClient.businessName,
            online: chatClient.online,
            chatId: data._id,
            messages: data.messages,
          },
        ]);
      }
    },
    [chatList, setChats, userId]
  );
  useEffect(() => {
    ChatSocketServer.eventEmitter.on("add-chat-response", handleChatAdd);
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "add-chat-response",
        handleChatAdd
      );
  }, [handleChatAdd]);

  useEffect(() => {
    const handleSearch = (state) => {
      setSearching(state);
    };
    ChatSocketServer.eventEmitter.on("loading-chats", handleSearch);
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "loading-chats",
        handleSearch
      );
  }, [searching]);

  const handleMessageAdd = useCallback(
    (data) => {
      const chats = chatList.filter((chat) => {
        if (chat.chatId === data.chatId) {
          chat.messages[0] = data;
          chat.chatId = data.chatId;
        }
        return chat;
      });
      setChats([...chats]);
    },
    [chatList, setChats]
  );

  const handleMessageUpdate = useCallback(
    (data) => {
      const chats = chatList.filter((chat) => {
        if (chat.chatId === data.chatId && chat.messages[0]._id === data._id) {
          chat.messages[0] = data;
          chat.chatId = data.chatId;
        }
        return chat;
      });
      setChats([...chats]);
    },
    [chatList, setChats]
  );

  useEffect(() => {
    ChatSocketServer.eventEmitter.on("add-message-response", handleMessageAdd);
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "add-message-response",
        handleMessageAdd
      );
  }, [handleMessageAdd]);

  useEffect(() => {
    ChatSocketServer.eventEmitter.on(
      "update-message-response",
      handleMessageUpdate
    );
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "update-message-response",
        handleMessageUpdate
      );
  }, [handleMessageUpdate]);

  const conversationItems = chatList?.map((chat, index) => {
    return (
      <div key={index} onClick={() => handleChatSelect(chat)}>
        <ConversationItem
          isActive={chat.businessId === selectedChat.businessId}
          conversation={chat}
        />
      </div>
    );
  });

  if (searching)
    return (
      <div
        style={{ textAlign: "center", paddingTop: "20px" }}
        id="conversation-list"
      >
        Loading chats
      </div>
    );
  if (!searching && chatList.length === 0)
    return (
      <div
        id="conversation-list"
        style={{ textAlign: "center", paddingTop: "20px" }}
      >
        No chats found. Modify your search query or start a new chat.
      </div>
    );
  return <div id="conversation-list">{conversationItems}</div>;
};

export default ConversationList;
