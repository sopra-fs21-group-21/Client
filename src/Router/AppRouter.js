import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import Portfolio from "../Portfolio/Portfolio";
import {RegisterGuard} from "./routeProtectors/RegisterGuard";
import {DashBoardGuard} from "./routeProtectors/DashBoardGuard";
import {ProfileIdGuard} from "./routeProtectors/ProfileIdGuard";
import {ProfileGuard} from "./routeProtectors/ProfileGuard";


class AppRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/'><Redirect to='/login' /></Route>
                    {/**login**/}
                    <Route exact path = '/login' component = {Login}/>

                    {/**Register**/}
                    <Route exact path = '/register' render={(props) => (
                        <RegisterGuard><Register {...props}/> </RegisterGuard>
                    )}/>
                    <Route exact path = '/signup' render={(props) => (
                        <RegisterGuard><Register {...props}/> </RegisterGuard>
                    )}/>

                    {/**DashBoard**/}
                    <Route exact path = '/dashboard' render={() => (
                        <DashBoardGuard><Dashboard/></DashBoardGuard>
                    )}/>

                    {/**profile**/}
                    <Route exact path = '/profile/:id' render={(props) => (
                        <ProfileIdGuard><Profile {...props}/> </ProfileIdGuard>
                    )}/>

                    <Route exact path = '/profile' render={(props) => (
                        <ProfileGuard><Profile {...props}/> </ProfileGuard>
                    )}/>


                    {/**portfolio**/}
                    <Route exact path = '/portfolio' component = {Portfolio}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;