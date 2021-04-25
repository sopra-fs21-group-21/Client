import React from "react";
import { Redirect } from "react-router-dom";
import {api, handleError} from "../../../helpers/api";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  else
  {
     try {
        api.get(`/user/${localStorage.getItem('token')}`);

    } catch (error) {
       return props.children;
    }
    alert(`Cant redirect while logged in, please log out first`);

    return <Redirect to={"/game"} />;}
};
