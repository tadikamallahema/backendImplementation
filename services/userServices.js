import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const user = new User({ name, email, password, role });
  await user.save();

  return { id: user._id, uId: user.uId, name: user.name, email: user.email, role: user.role };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user._id, uId: user.uId, name: user.name, email: user.email, role: user.role } };
};
