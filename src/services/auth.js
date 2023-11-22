import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    return {
      msg: "Invalid Email & Password",
      status: 500,
      data: null,
    };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    // return "Invalid password";
    return {
      msg: "Invalid Email & Password",
      status: 500,
      data: null,
    };
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
  // return token;
  return {
    msg: "Login Successful",
    status: 200,
    data: token,
  };
};
const register = async (data) => {
  // const { password } = data;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const UserObj = {
    ...data,
    password: hashedPassword,
  };
  const registerUser = await User.create(UserObj);
  const { password, ...responseUser } = registerUser.toObject();
  // return responseUser;
  return {
    msg: "Register Successful",
    status: 200,
    data: responseUser,
  };
};
const get = async (data) => {
  const UserData = await User.find({});
  return UserData;
};

export default {
  login,
  register,
  get,
};
