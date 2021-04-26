import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {Label} from "../Design/Label";
import {InputField} from "../Design/InputField";
import {Button} from "../Design/Button";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

import { api, handleError } from '../helpers/api';
import User from "../models/User";

const ForgotPassword = styled(Label)`

  &:hover {
    transform: translateY(-1px);
    text-shadow: #E8E8E8 2px 2px 10px;
  }

  margin-left: 20%;
  margin-bottom: 10px;
  width: 60%;
  text-align: center;
  text-transform: none;
  text-decoration: underline;
`

const StandardInputField = styled(InputField)`
  height: 30px;
  padding-left: 15px;
  width: 56.222222222%;
  margin-bottom: 20px;
  margin-left: 20%;
`

const StandardLabel = styled(Label)`
  margin-left: 20%;
  margin-bottom: 10px;
`

const StandardBaseContainer = styled(BaseContainer)`
  width: 30%;
  height: 300px;
  padding-bottom: 25px;
  padding-top: 25px;
`

const StandardButton = styled(Button)`
  width: 60%;
  height: 30px;
  margin-left: 20%;
  margin-top: 20px;
`

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: null,
            password:null,
            user:null
        };
    }

    register(){
        this.props.history.push('/register');
    }

    async login(){
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            const responsePut = await api.put('/users', requestBody);


            // login success and user will be redirected to the dashboard page
            // token is saved to the localstorage
                var mainUser = new User(responsePut.data);
                mainUser.pwd = this.state.password
                console.log("login")
                console.log(mainUser)
                localStorage.setItem('user', JSON.stringify(mainUser));
                this.props.history.push('/dashboard');

    }
        catch (error) {
            // user not registered yet and will be directed to the register page
            if (error.response.data.message === "No such user exists" ){
                await alert(`please sign up first`);
                this.props.history.push({
                    pathname: '/register',
                });
            }

            else if (error.response.data.message === "Wrong password" ){
                await alert(`Wrong password, please try again`);
            }
            else alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }



    render(){
        return(
        <Background>
            <StandardBaseContainer>
                //username
                <StandardLabel>Username:</StandardLabel>
                <StandardInputField placeholder = 'Enter here...'               onChange={e => {
                    this.handleInputChange('username', e.target.value);
                }}/>
                <StandardLabel>Password:</StandardLabel>
                <StandardInputField type="password" placeholder = 'Enter here...' onChange={e => {
                    this.handleInputChange('password', e.target.value);
                }}/>
                <ForgotPassword>forgot your password?</ForgotPassword>
                <StandardButton type="submit"
                                disabled={!this.state.username || !this.state.password}
                                onClick={() => {this.login();}}
                >Login</StandardButton>
                <StandardButton
                onClick={() => {this.register();}}
                >Register</StandardButton>
            </StandardBaseContainer>
        </Background>
        );
    }
}

export default withRouter(Login);
