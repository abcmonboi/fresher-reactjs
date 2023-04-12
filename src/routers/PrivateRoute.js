import React from "react";
import TableUsers from "../components/TableUsers";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  if(user && !user.auth){
    return <>
      <h1>Not authorized</h1>
    </>
  }
  return (
    <>
      <TableUsers />
    </>
  );
};

export default PrivateRoute;
