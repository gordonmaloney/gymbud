import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import user from "../models/user.js";

import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const getUsers = await user.find();

    res.status(200).json(getUsers);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    console.log(id)

    const getUser = await user.findById(id);

    res.status(200).json(getUser);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await user.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const AddExercise = async (req, res) => {
  const { id: _id } = req.params;
  const newExercise = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");

  const User = await user.findById(_id);

  User.exercises.push(newExercise);

  User.save();

  res.json(User);
};



export const AddTarget = async (req, res) => {
  const { id: _id } = req.params;
  const { exerciseId: exerciseId } = req.params;
  const newTarget = req.body;

  //needs to come through as {target: "200"}

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");

  const User = await user.findById(_id);
  const Exercise = await User.exercises.filter(
    (exercise) => exercise._id == exerciseId
  )[0];

  Exercise.target = newTarget.target;

  User.save();

  res.json(User);
};


export const UpdateExercise = async (req, res) => {
    const { id: _id } = req.params;
    const { exerciseId: exerciseId } = req.params;
    const Entry = req.body;


    console.log(Entry)
    
    if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");

  const User = await user.findById(_id);
  const Exercise = await User.exercises.filter(
    (exercise) => exercise._id == exerciseId
  )[0];

  Exercise.history.push(Entry)

  User.save();

  res.json(User);
}