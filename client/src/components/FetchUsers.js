import React from 'react'
import { useSelector } from "react-redux";

export const FetchUsers = () => {

    const users = useSelector((state) => state.auth);

 return (
    users
  )
}
