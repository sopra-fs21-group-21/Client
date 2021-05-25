import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {Label} from "../Design/Label";
import {InputField} from "../Design/InputField";
import {Button} from "../Design/Button";
import React from "react";
import styled from "styled-components";
import User from "../models/User";
import {api, handleError} from "../helpers/api";
import {Link} from "react-router-dom";

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
  cursor: pointer;
`

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            username: null,
            email:null,
            password:null,
            repeatedPwd:null,
            validMail:false
        };
    }


    async register() {
       try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                mail:this.state.email
            });
            console.log(requestBody.data)
            const responsePOST = await api.post('/users', requestBody);


            // Store the token into the local storage.
             var user = new User(responsePOST.data)
             user.pwd = await this.state.password
           console.log("register")
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user));

            // Login successfully worked --> navigate to the route /dashboard
            this.props.history.push({
                pathname: '/dashboard',
            });
         }
         catch (error) {
             if (error.response.data.message )
                 await alert(error.response.data.message );
             else alert("error occurred while sign up")
    }}

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    render(){
        return(
            <Background>
                <StandardBaseContainer>
                    <StandardLabel>Username:</StandardLabel>
                    <StandardInputField placeholder = 'Enter here...' onChange={e => {
                        this.handleInputChange('username', e.target.value);
                    }}/>
                    <StandardLabel >Email:</StandardLabel>
                    <StandardInputField  type="email" placeholder = 'example@example.example' onChange={e => {
                        this.handleInputChange('email', e.target.value);
                        this.emailVerify(e.target.value);
                    }}/>
                    <StandardLabel >Password:</StandardLabel>
                    <StandardInputField type="password" placeholder = 'Enter here...' onChange={e => {
                        this.handleInputChange('password', e.target.value);
                    }}/>
                    <StandardLabel >Repeat Password:</StandardLabel>
                    <StandardInputField  type="password" placeholder = 'Enter here...' onChange={e => {
                        this.handleInputChange('repeatedPwd', e.target.value);
                    }}/>
                    <StandardButton   disabled={!this.state.validMail || !this.state.username || !this.state.password || !this.state.repeatedPwd || !this.state.email || !(this.state.repeatedPwd===this.state.password)}
                                      onClick={() => {this.register();}}
                    >Register</StandardButton>
                    <Link  to="/login"><AlreadyAccount style={{cursor: 'pointer'}} as='button'

                    >Already have an Account...?</AlreadyAccount></Link>
                </StandardBaseContainer>
            </Background>
        );
    }


    emailVerify( email ) {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) ) {
            this.setState({validMail:true})
        }
        else {
            this.setState({validMail:false})
        }

    }

}

export default Register;