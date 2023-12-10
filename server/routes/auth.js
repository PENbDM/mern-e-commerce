import express from "express";
const router = express.Router();
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { registerValidation } from "../validation.js";
import { loginValidation } from "../validation.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

//REGISTER//
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json({
        message: "This username already exists",
      });
    }
    if (existingUser) {
      // Если пользователь с таким email уже существует, возвращаем ошибку
      return res.status(400).json({
        message: "This email already exists",
      });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      const token = jwt.sign(
        {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      savedUser._doc.token = token;
      // Store the token inside the _doc object

      res.status(201).json({ user: savedUser._doc });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//LOGIN//
router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json({
          message: "Username not exist",
        });
      }
      const hashPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );

      const Originalpassword = hashPassword.toString(CryptoJS.enc.Utf8);
      if (Originalpassword !== req.body.password) {
        return res.status(400).json({
          message: "Wrong credentials!",
        });
      }
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      //under we making distructure, to take out password from response
      const { password, ...others } = user._doc;
      others.token = accessToken;

      res.status(200).json({ user: others });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);
export default router;
