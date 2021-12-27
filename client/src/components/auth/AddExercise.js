import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AddExercise } from "../../actions/auth";


export const AddExerciseComponent = () => {



  const dispatch = useDispatch();

  const [entry, setEntry] = useState(null);

  const posts = useSelector((state) => state.posts);

  const handleUpdate = (id, entry) => {
      console.log(id, entry)
    dispatch(AddExercise(id, entry));
  };


  posts.length > 0 && console.log(posts[0].exercises)

  return (
    <div>
    <input
        type="exercise"
        placeholder="update post"
        onChange={(e) =>
            setEntry({ ...entry, exercise: e.target.value })
        }
      />

    <input
        type="target"
        placeholder="update post"
        onChange={(e) =>
            setEntry({ ...entry, target: e.target.value })
        }
      />
      {posts.map((post) => (
        <p>
          {post.email}{" "}
          <button onClick={() => handleUpdate(post._id, entry)}>Update</button>
        </p>
      ))}
    </div>
  );
};
