import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//SIGNUP 
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save()
    res.status(200).send("User has been created!")
  } catch (err) {
    next(err)
  }
};

//SIGNIN using the JWT
export const signin = async (req, res, next) => {
  try {
    // finding the username in our DB
    const user = await User.findOne({ username: req.body.username });
    // if he doesn't exist we will receive this error as we explained in error.js
    if (!user) return next(createError(404, "User not found!"));
    // comparing the password if is't the same using the bcrypt.compare
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    // if the password is wrong we will receive this error
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
    // assigning a token to the user when he logs in
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    // seperating the user password on the other details , also concerning the _doc it's an object containing our deatils : u can check it const { password, ...others } = user; and see the response 
    const { password, ...others } = user._doc;

    // sending the cookie to the user 
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

//SIGNIN with Google
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
