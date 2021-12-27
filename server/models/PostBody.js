import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  postTitle: String
});

const PostBody = mongoose.model("PostBody", postSchema);

export default PostBody;
