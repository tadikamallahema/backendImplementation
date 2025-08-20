
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Not authorized, login again" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default userAuth;
