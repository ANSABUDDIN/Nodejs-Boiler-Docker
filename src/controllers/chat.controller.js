import chatService from "../services/chat.service.js";
import { createResponse } from "../utils/response.js";

class ChatController {
  async chatAuth(req, res) {
    try {
      console.log(req.body);
      const chatResult = await chatService.chatAuth(req.body);
      // createResponse(res, chatResult, 200, "Message featch successfully");
      res.status(200).send(chatResult);
    } catch (error) {
      console.log("error", error);
      createResponse(res, null, 500, "Internal Server Error");
    }
  }

  async getSingleChatMessage(req, res) {
    try {
      const chatResult = await chatService.getSingleChatMessage(req.query);
      createResponse(res, chatResult, 200, "Message featch successfully");
    } catch (error) {
      console.log("error", error);
      createResponse(res, null, 500, "Internal Server Error");
    }
  }

  async sendMessage(req, res) {
    try {
      const chatResult = await chatService.sendMessage(req.body);
      createResponse(res, chatResult, 200, "Message Send successfully");
    } catch (error) {
      console.log("error", error);
      createResponse(res, null, 500, "Internal Server Error");
    }
  }

  async chatList(req, res) {
    try {
      const chatResult = await chatService.chatList(req.query);
      createResponse(res, chatResult, 200, "Chat List Get successfully");
    } catch (error) {
      console.log("error", error);
      createResponse(res, null, 500, "Internal Server Error");
    }
  }
  
  async readMessages(req, res) {
    try {
      const chatResult = await chatService.readMessages(req.body);
      createResponse(res, chatResult, 200, "Message Read successfully");
    } catch (error) {
      console.log("error", error);
      createResponse(res, null, 500, "Internal Server Error");
    }
  }
}

const chatController = new ChatController();
export default chatController;
