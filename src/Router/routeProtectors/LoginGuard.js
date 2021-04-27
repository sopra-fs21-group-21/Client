/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
  if (localStorage.getItem("user")) {
      /**toDo this.logout bcz user still signed in**/

      localStorage.removeItem('user');
      return props.children;
  }
  else
  {
      return props.children;
     }
};
