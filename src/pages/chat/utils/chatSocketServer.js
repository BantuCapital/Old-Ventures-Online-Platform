import * as io from "socket.io-client";
const events = require("events");

class ChatSocketServer {
  socket = null;
  eventEmitter = new events.EventEmitter().setMaxListeners(0);

  establishSocketConnection(userId) {
    try {
      this.socket = io(`${process.env.REACT_APP_API_END}`, {
        query: `userId=${userId}`,
      });

      this.socket.on("connect", () => {
        this.socket
          .emit("authenticate", { token: localStorage.getItem("token") }) //send the jwt
          .on("authenticated", () => {
            //do other things
          })
          .on("unauthorized", (msg) => {
            alert("This acount is not authorized to connect to the server.");
            console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
            throw new Error(msg.data.type);
          });
      });
    } catch (error) {
      alert(`Something went wrong; Can't connect to socket server`);
    }
  }

  getChatList({ userId, searchQuery }) {
    this.eventEmitter.emit("loading-chats", true);
    this.socket.emit("chat-list", {
      userId,
      searchQuery,
    });
    this.socket.on("chat-list-response", (data) => {
      // console.log(data);
      this.eventEmitter.emit("loading-chats", false);
      this.eventEmitter.emit("chat-list-response", data);
    });
  }

  getNotifications(userId) {
    this.socket.emit("notifications", { userId });
    this.socket.on("notification-response", (data) => {
      this.eventEmitter.emit("notification-response", data);
    });
  }

  sendNotification(data) {
    this.socket.emit("send-notification", data);
  }

  receiveNotifications() {
    this.socket.on("send-notification-response", (data) => {
      this.eventEmitter.emit("send-notification-response", data);
    });
  }

  sendMessage(message) {
    console.log("message");
    this.socket.emit("add-message", message);
  }

  setTyping(data) {
    this.socket.emit("set-typing", data);
  }

  receiveTypingUpdate() {
    this.socket.on("set-typing-response", (data) => {
      this.eventEmitter.emit("set-typing-response", data);
    });
  }

  receiveMessage() {
    this.socket.on("add-message-response", (data) => {
      this.eventEmitter.emit("add-message-response", data);
    });
  }

  addChat(data) {
    this.socket.emit("add-chat", data);
  }

  receiveChat() {
    this.socket.on("add-chat-response", (data) => {
      this.eventEmitter.emit("add-chat-response", data);
    });
  }

  updateMessage(message) {
    console.log("update");
    this.socket.emit("update-message", message);
  }

  deleteNotifications(data) {
    this.socket.emit("delete-notifications", data);
    this.socket.on("delete-notifications-response", (data) => {
      this.eventEmitter.emit("delete-notifications-response", data);
    });
  }

  receiveMessageUpdates() {
    this.socket.on("update-message-response", (data) => {
      console.log("update receive");
      this.eventEmitter.emit("update-message-response", data);
    });
  }

  logout(userId) {
    this.socket.emit("logout", userId);
    this.socket.on("logout-response", (data) => {
      this.eventEmitter.emit("logout-response", data);
    });
  }
}

export default new ChatSocketServer();
