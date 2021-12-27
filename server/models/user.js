import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    exercises: [
      {
        exercise: { type: String, default: "" },
        target: { type: String, default: "" },
        history: [{ weight: { type: String, default: "" }, date: String }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
