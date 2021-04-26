import React from "react";
import styled from "styled-components";
import {FormContainer} from "../Design/FormContainer";
import {Label} from "../Design/Label";
import LoadingSpinner from "../Design/LoadingSpinner";
const ProfileFormContainer = styled(FormContainer)`
  width: 100%;
  height: 50%;
  border-radius: 25px;
  margin-left: 4%;
  margin-right: 10%;
  margin-top: 3%;
  background-color: black;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const UserInfoLabel = styled(Label)`
    width: 100%;
    min-height: 4vh;
    margin: 5px;
`


class UserInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {user:this.props.user}
    }


    render() {
        return(
            <ProfileFormContainer>
                        <UserInfoLabel>Status: {  this.state.user.status}</UserInfoLabel>
                        <UserInfoLabel>Username: {this.state.user.username}</UserInfoLabel>
                        <UserInfoLabel>E-Mail: {  this.state.user.mail}</UserInfoLabel>
                        <UserInfoLabel>Joined: {  this.state.user.creationDate.toString().slice(0, 10)}</UserInfoLabel>
            </ProfileFormContainer>
        );
    }
}

export default UserInfo;
