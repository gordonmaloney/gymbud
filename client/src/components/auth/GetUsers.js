import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../actions/auth";

export const GetUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.auth);

  if (users.length > 0) {
  return (
    <div>
      {users.map(user => user.email)}
    </div>
  );
  }
   else return <></>
};
