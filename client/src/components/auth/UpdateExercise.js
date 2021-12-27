import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateExercise } from "../../actions/auth";


export const UpdateExerciseComponent = () => {



  const dispatch = useDispatch();

  const [entry, setEntry] = useState(null);

  const posts = useSelector((state) => state.posts);

  const handleUpdate = (id, exerciseId, entry) => {
    setEntry({ ...entry, date: new Date().toLocaleDateString() })

      console.log(entry)
    dispatch(updateExercise(id, exerciseId, entry));
  };


  posts.length > 0 && console.log(posts[0].exercises)

  return (
    <div>
    <input
        type="exercise"
        placeholder="weight"
        onChange={(e) =>
            setEntry({ ...entry, weight: e.target.value })
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
