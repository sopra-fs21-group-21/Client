import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {Label} from "../Design/Label";
import {InputField} from "../Design/InputField";
import {Button} from "../Design/Button";
import React from "react";
import styled from "styled-components";

const AlreadyAccount = styled(Label)`

  &:hover {
    transform: translateY(-1px);
    text-shadow: #E8E8E8 2px 2px 10px;
  }

  margin-left: 20%;
  margin-bottom: 5px;
  margin-top: 20px;
  width: 60%;
  text-align: center;
  text-transform: none;
  text-decoration: underline;
  font-size: 14px;
  background-color: black;
  border: none;
  outline: none;
`

const StandardLabel = styled(Label)`
  margin-left: 20%;
  margin-bottom: 10px;
`

const StandardInputField = styled(InputField)`
  height: 30px;
  padding-left: 15px;
  width: 56.222222222%;
  margin-bottom: 20px;
  margin-left: 20%;
`

const StandardBaseContainer = styled(BaseContainer)`
  width: 30%;
  height: 500px;
  padding-bottom: 25px;
  padding-top: 25px;
`

const StandardButton = styled(Button)`
  width: 60%;
  height: 30px;
  margin-left: 20%;
  margin-top: 20px;
`

class Register extends React.Component{
    constructor(props){
        super(props);
    }

    redirect(){
        this.props.history.push('/login')
    }

    render(){
        return(
            <Background>
                <StandardBaseContainer>
                    <StandardLabel>Username:</StandardLabel>
                    <StandardInputField placeholder = 'Enter here...'/>
                    <StandardLabel>Email:</StandardLabel>
                    <StandardInputField placeholder = 'Enter here...'/>
                    <StandardLabel>Password:</StandardLabel>
                    <StandardInputField placeholder = 'Enter here...'/>
                    <StandardLabel>Repeat Password:</StandardLabel>
                    <StandardInputField placeholder = 'Enter here...'/>
                    <StandardButton
                    onClick={() => {this.redirect();}}
                    >Register</StandardButton>
                    <AlreadyAccount as='button'
                    onClick={() => {this.redirect();}}
                    >Already have an Account...?</AlreadyAccount>
                </StandardBaseContainer>
            </Background>
        );
    }
}

export default Register;