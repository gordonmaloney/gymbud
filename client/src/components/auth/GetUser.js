import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions/auth";

export const GetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser("614f1c55ccd141f2704c367f"));
  }, []);

  const user = useSelector((state) => state.auth);


  console.log(user.filter(user => user._id = "614f1c55ccd141f2704c367f")[0])

  if (user) {
  return (
    <div>
...
    </div>
  );
  }
   else return <></>
};
