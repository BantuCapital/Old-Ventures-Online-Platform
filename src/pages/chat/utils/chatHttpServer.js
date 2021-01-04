import * as axios from "axios";

class ChatHttpServer {
  userSessionCheck(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_END}/userSessionCheck`,
          {
            userId: userId,
          }
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getMessages(chatId, offset) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_END}/chat/messages`,
          {
            chatId,
            offset,
          }
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  createChat({ clientOneId, clientTwoId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_END}/chat`,
          {
            clientOneId,
            clientTwoId,
          }
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new ChatHttpServer();
