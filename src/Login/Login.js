import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {Label} from "../Design/Label";
import {InputField} from "../Design/InputField";
import {Button} from "../Design/Button";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

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
    }

    register(){
        this.props.history.push('/register');
    }

    login(){
        this.props.history.push('/dashboard');
    }

    render(){
        return(
        <Background>
            <StandardBaseContainer>
                <StandardLabel>Username:</StandardLabel>
                <StandardInputField placeholder = 'Enter here...'/>
                <StandardLabel>Password:</StandardLabel>
                <StandardInputField placeholder = 'Enter here...'/>
                <ForgotPassword>forgot your password?</ForgotPassword>
                <StandardButton
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
