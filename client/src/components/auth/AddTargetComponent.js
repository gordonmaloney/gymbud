import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AddTarget } from "../../actions/auth";


export const AddTargetComponent = () => {



  const dispatch = useDispatch();

  const [entry, setEntry] = useState(null);

  const posts = useSelector((state) => state.posts);

  const handleUpdate = (id, exerciseId, entry) => {
      console.log(id, exerciseId, entry)
    dispatch(AddTarget(id, exerciseId, entry));
  };


  posts.length > 0 && console.log(posts[0].exercises)

  return (
    <div>
    <input
        type="exercise"
        placeholder="update target"
        onChange={(e) =>
            setEntry({ ...entry, target: e.target.value })
        }
      />


      {posts.length > 0 && posts[0].exercises.map((post) => (
        <p>
          {post.exercise}{" "}
          <button onClick={() => handleUpdate(posts[0]._id, post._id, entry)}>Update target</button>
        </p>
      ))}

    </div>
  );
};
