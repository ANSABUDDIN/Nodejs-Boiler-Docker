import authService from "../services/auth.service.js";
import { createResponse } from "../utils/response.js";

class AuthController {
  async login(req, res) {
    try {
      const loginResult = await authService.login(req.body);
      createResponse(
        res,
        loginResult.data,
        loginResult.status,
        loginResult.msg
      );
    } catch (error) {
      console.log('error', error);
      createResponse(res, null, 500, "Internal Server Error");
    }
  }

  async register(req, res) {
    try {
      const registerResult = await authService.register(req.body);
      createResponse(
        res,
        registerResult.data,
        registerResult.status,
        registerResult.msg
      );
    } catch (error) {
      console.log(error)
      createResponse(res, null, 500, "Internal Server Error");
    }
  }

  async get(req, res) {
    try {
      const users = await authService.get();
      createResponse(res, users, 200, "Users Retrieved Successfully");
    } catch (error) {
      createResponse(res, null, 500, "Internal Server Error");
    }
  }
}

const authController = new AuthController();
export default authController;
