import User from "../../models/User";
import {api} from "../../helpers/api";
export const LoginGuard = props => {
  if (localStorage.getItem("user")) {
      const mainUser = new User(JSON.parse(localStorage.getItem('user')))
      try{
          /**change the user status to offline**/
          api.put(`/users/logout`, {},{
              headers: {
                  token: mainUser.token
              }
          });

      }
      catch (error){
          console.log(error)
      }

      localStorage.removeItem('user')
      return props.children;
  }

  else
  {
      return props.children;
     }
};
