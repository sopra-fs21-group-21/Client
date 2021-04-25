import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import Portfolio from "../Portfolio/Portfolio";

class AppRouter extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path = '/'>
                    <Redirect to='/login' />
                </Route>
                <Route exact path = '/login' component = {Login}></Route>
                <Route exact path = '/register' component = {Register}></Route>
                <Route exact path = '/dashboard' component = {Dashboard}></Route>
                <Route exact path = '/profile' component = {Profile}></Route>
                <Route exact path = '/portfolio' component = {Portfolio}></Route>
            </Switch>
        );
    }
}

export default AppRouter;