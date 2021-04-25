import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import Portfolio from "../Portfolio/Portfolio";
import {RegisterGuard} from "./routeProtectors/RegisterGuard";
import {DashBoardGuard} from "./routeProtectors/DashBoardGuard";

class AppRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/'>
                        <Redirect to='/login' />
                    </Route>
                    <Route exact path = '/login' component = {Login}/>
                    <Route exact path = '/register' render={() => (
                        <RegisterGuard><Register/></RegisterGuard>
                    )}/>
                    <Route exact path = '/signup' render={() => (
                        <RegisterGuard><Register/></RegisterGuard>
                    )}/>
                    <Route exact path = '/dashboard' render={() => (
                        <Dashboard/>
                    )}/>
                    <Route exact path = '/profile' component = {Profile}/>
                    <Route exact path = '/portfolio' component = {Portfolio}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;