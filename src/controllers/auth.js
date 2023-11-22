import auth from "../services/auth.js";
import { createResponse } from "../utils/response.js";
const login = async (req, res) => {
  const login = await auth.login(req.body);
  createResponse(res, login.data, login.status, login.msg);
};
const register = async (req, res) => {
  const register = await auth.register(req.body);
  // res.send(register);
  createResponse(res, register, 200, "User Register Successfully");
};
const get = async (req, res) => {
  const register = await auth.get();
  // res.send(register);
  createResponse(res, register.data, register.status, register.msg);
};

export default {
  login,
  register,
  get,
};
