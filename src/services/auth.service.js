import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  async login(data) {
    const { email, password, role } = data;
    const user = await User.findOne({ email, role });
    if (!user) {
      return {
        msg: "No User found with this email",
        status: 500,
        data: null,
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        msg: "Invalid Email & Password",
        status: 500,
        data: null,
      };
    }
    const token = jwt.sign({ userId: user?._id }, process.env.SECRET_KEY);
    return {
      msg: "Login Successful",
      status: 200,
      data: { token, user },
    };
  }

  async register(data) {
    const userExist = await User.find({ email: data.email });
    if (userExist.length > 0) {
      return {
        msg: "User Already Exist With This Email",
        status: 403,
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const UserObj = {
      ...data,
      password: hashedPassword,
    };
    const registerUser = await User.create(UserObj);
    const { password, ...responseUser } = registerUser.toObject();
    return {
      msg: "Register Successful",
      status: 200,
      data: responseUser,
    };
  }

  async get(data) {
    const UserData = await User.find({});
    return UserData;
  }
}

// To use this class, you can create an instance and call the methods:
const authService = new AuthService();

export default authService;

