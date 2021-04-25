import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from 'C:/Users/chant/Desktop/group-21-sopra/src/Login/Login';
import Register from 'C:/Users/chant/Desktop/group-21-sopra/src/Register/Register';
import Dashboard from 'C:/Users/chant/Desktop/group-21-sopra/src/Dashboard/Dashboard';
import Profile from 'C:/Users/chant/Desktop/group-21-sopra/src/Profile/Profile';
import Portfolio from 'C:/Users/chant/Desktop/group-21-sopra/src/Portfolio/Portfolio';

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