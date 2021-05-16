import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {FormContainer} from "../Design/FormContainer";
import {ListContainer} from "../Design/ListContainer";
import {ListElement} from "../Design/ListElement";
import PortfolioOverview from "../Base Components/PortfolioOverview";
import {Label} from "../Design/Label";
import {InputField} from "../Design/InputField";
import {Button} from "../Design/Button";
import {ButtonContainer} from "../Design/ButtonContainer"
import MenuItem from "../Design/MenuItem";
import MenuPopUpWrapper from "../Design/Wrappers/MenuPopUpWrapper";
import SortingPopUpWrapper from "../Design/Wrappers/SortingPopUpWrapper";
import CreatePortfolioWrapper from "../Design/Wrappers/CreatePortfolioWrapper";
import ChangePasswordWrapper from "../Design/Wrappers/ChangePasswordWrapper";
import JoinPortfolioWrapper from "../Design/Wrappers/JoinPortfolioWrapper";
import ChangeEmailWrapper from "../Design/Wrappers/ChangeEmailWrapper";
import ChangeUsernameWrapper from "../Design/Wrappers/ChangeUsernameWrapper";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../Design/LoadingSpinner";
import CLSpinner from "../Design/CLSpinner";

import User from "../models/User";
import UserInfo from "./UserInfo";
import { api, handleError } from '../helpers/api';
import {Container} from "react-bootstrap";




const DashboardBaseContainer = styled(BaseContainer)`
  min-width: 80vw;
  min-height: 83vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 3vw;
`

const PortfolioFormContainer = styled(FormContainer)`
  width: 85%;
  height: 70vh;
  border-radius: 25px;
  margin-left: 10%;
  margin-right: 5%;
  margin-top: 3%;
  flex-direction: column;
  align-content: flex-start;

`
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

const ProfileButtonContainer = styled.div`
  height: 50%;
  width: 100%;
  margin-left: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const ProfileMediumContainer = styled.div`
  flex-direction: column;
  height: 70vh;
  align-items: flex-start;
  justify-content: flex-start;
`

const PortfolioListContainer = styled(ListContainer)`
  padding: 0;
  margin: 0;
  width: 100%;
`

const PortfolioMediumContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const OverViewContainer = styled.div`
  height: 100%;
  width: 50%;
  flex-direction: column;
`

const PortfolioContainer = styled(ListElement)`
  background-color: grey;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 5%;
  border-radius: 25px;
  width: 90%;
`

const   DashBoardButton = styled(Button)`
  width: 60%;
  margin-bottom: 4%;
  height: 3.7vh;
  padding: 5px;
`

const MenuButton = styled(Button)`
  width: 100%;
  margin-top: 20%;
  height: 5%;
  padding: 5px;
  outline: black;
  border-style: solid;
`

const PortfolioLabel = styled(Label)`
  margin: 10%;
`

const ProfileLabel = styled(Label)`
  margin-left: 5%;
`

const MenuBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 10vw;
  min-height: 100vh;
  margin-left: 20px;
`

const SortMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  min-height: 10%;
  min-width: 92%;
`

const CreatePortfolioInput = styled(InputField)`
  min-height: 4vh;
  width: 80%;
`

const CreatePortfolioMidContainer = styled.div`
  display: flex;
  min-height: 3vh;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const CreatePortfolioButton = styled(Button)`
  min-height: 4vh;
  width: 40%;
  margin-left: 10%;
  margin-right: 10%;
  &:focus {
    background-color: rgba(255,173,78,0.8);
    box-shadow: 1px 1px 3px 2px rgba(255, 173, 0, 0.3);
  }
`



const ProfileChangeButton = styled(DashBoardButton)`
  height: 3vh;
  width: 47%;
`

class Profile extends React.Component{
    constructor(props){
        super(props);

        const parsedUser = new User(JSON.parse(localStorage.getItem('user')))

        this.state = {
            portfolios: null,
            CreatePortTrigger: false,
            JoinPortTrigger: false,
            DropDownTrigger: false,
            SortingDropDownTrigger: false,
            EmailTrigger: false,
            UsernameTrigger: false,
            PasswordTrigger: false,
            portfolioVisibility: 'SHARED',
            createPortfolioName: null,
            // user is either the same user as mainUser or other one, if this is the case change information
            // buttons wont be displayed
            user: null,
            mainUser:parsedUser,

            username:null,
            mail:    null,
            pwd:     null,
            newPwd: null,

            portfolioCode:null
        }

        this.handleButtonClick=this.handleButtonClick.bind(this);
    }

    handleButtonClick(key,bool) {
        this.setState({ [key]: bool });
    }

    async logout(){
        if (localStorage.getItem('user')){
            try{
                const parsedUser = new User(JSON.parse(localStorage.getItem('user')))

                /**change the user status to offline**/
                await api.put(`/users/logout`, {},{
                    headers: {
                        token: parsedUser.token
                    }
                });
            }
            catch (error){
                console.log(error)
            }

            localStorage.removeItem('user')
        }
        this.props.history.push('/login');
    }

    async updateData(){
        console.log(this.state.username)
        console.log(this.state.pwd)
        console.log(this.state.mail)

        const requestBody = JSON.stringify({
            username: this.state.username,
            password: this.state.newPwd,
            mail:this.state.mail
        });
        try{
            await api.put(`/users/${this.state.mainUser.id}`, requestBody,{
                headers: {
                    token: this.state.mainUser.token
                }
            });
            const responseGet = await api.get(`/users/${this.state.mainUser.id}`);
            const oldPwd = this.state.mainUser.pwd
            var mainUser = new User(responseGet.data);
            mainUser.pwd = oldPwd
            if (this.state.newPwd){
                mainUser.pwd = this.state.newPwd}
            this.state.mainUser = mainUser
            localStorage.setItem('user', JSON.stringify(this.state.mainUser));

            //change the state of the user to the new values
            this.setDataToNull()
            this.props.history.push({
                pathname: '/profile',
            });        }
        catch (error){
            if (error.response)
                if (error.response.data.message === "The provided username is already taken. Please choose another one." ){
                    alert(`The provided username is already taken. Please choose another one.`);
                    this.handleButtonClick('UsernameTrigger',true)


                }
            console.log(error)
        }
    }

    async componentDidMount() {
        try {
            if (this.props.location.state !== undefined){
                await this.setState({ user: this.props.location.state.user});
            }
            else{
                const { id } = this.props.match.params;
                if (id === undefined) {this.setState({ user: this.state.mainUser });
                    this.props.history.push({
                        pathname: `/profile/${this.state.mainUser.id}`,
                    });
                }
                else {

                    /**if user try to access profile/id where id belongs to nonuser**/
                    try{
                        const response = await api.get(`/users/${id}`);
                        await this.setState({ user: response.data });
                    }
                    catch (error) {
                        alert("User with id: " + id + " does not exist")
                        this.setState({ user: this.state.mainUser })
                        this.props.history.push({
                            pathname: `/profile/${this.state.mainUser.id}`,
                        });
                    }
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            alert(`Something went wrong while fetching the user: \n${handleError(error)}`);
            this.props.history.push('/dashboard')
        }
        this.getPortfolios();
    }


    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }


    setDataToNull(){
        this.setState( {username:null})
        this.setState( {mail:null})
        this.setState( {pwd:null})
        this.setState( {newPwd: null})
    }

    async getPortfolios(){
        try {
            let testId = this.props.match.params.id;

            const requestUrl = 'users/' + testId;
            const response = await api.get(requestUrl, {});

            const tempPorts = response.data.collaboratingPortfolios;
            const tempPorts2 = response.data.ownedPortfolios;
            const tempPorts3 = tempPorts.concat(tempPorts2)

            this.setState({portfolios: tempPorts3});
            console.log(this.state.portfolios);
        }

        catch(error){
            alert('Something went wrong')
        }
    }

    async createPortfolio() {
        try {

            const requestBody = {
                'name': this.state.createPortfolioName,
                'visibility': this.state.portfolioVisibility
            }

            console.log(requestBody);

            await api.post('/portfolios/',requestBody,{
                headers: {
                    token: this.state.user.token
                }
            });

            this.handleButtonClick('CreatePortTrigger',false)
            this.handleButtonClick('createPortfolioName','')
            this.setState({portfolios: []});
            this.getPortfolios()
        }

        catch(error){
            alert(error.response.data.message)
        }
    }

    render(){
        return(

            <Background>

                {/*Dashboard Container containing the Profile, Portfolio as well as the labels*/}
                <DashboardBaseContainer>

                    {/*Profile*/}
                    <OverViewContainer>
                        <ProfileLabel>Profile Overview</ProfileLabel>
                        <ProfileMediumContainer>

                            {/**ProfileInformation*/}
                            {!this.state.user ? <LoadingSpinner/> :
                                <UserInfo user ={this.state.user} />}



                            {!this.state.user ? "" :(

                                <ProfileButtonContainer>
                                    {this.state.mainUser.token === this.state.user.token ?
                                        <ProfileButtonContainer>
                                            {/**Change email**/}
                                            <ProfileChangeButton onClick = {() => {
                                                this.handleButtonClick('PasswordTrigger',false)
                                                this.handleButtonClick('UsernameTrigger',false)
                                                this.handleButtonClick('EmailTrigger',true)                                }}>
                                                Change Email
                                            </ProfileChangeButton>

                                            {/**Change email popup**/}
                                            <ChangeEmailWrapper trigger = {this.state.EmailTrigger} setTrigger={this.handleButtonClick}>
                                                <br/>
                                                <Label>New E-Mail:</Label>
                                                <br/>
                                                <CreatePortfolioInput onChange={e => {
                                                    this.handleInputChange('mail', e.target.value);
                                                }} />
                                                <br/>
                                                <CreatePortfolioButton disabled={!this.state.mail} onClick={() => {this.updateData()
                                                    this.handleButtonClick('EmailTrigger',false)
                                                }}>Change E-Mail</CreatePortfolioButton>
                                                <br/>
                                            </ChangeEmailWrapper>

                                            {/**Change username**/}
                                            <ProfileChangeButton onClick = {() => {
                                                this.handleButtonClick('PasswordTrigger',false)
                                                this.handleButtonClick('UsernameTrigger',true)
                                                this.handleButtonClick('EmailTrigger',false)                                }}>
                                                Change Username
                                            </ProfileChangeButton>

                                            {/**Change username popup**/}
                                            <ChangeUsernameWrapper trigger = {this.state.UsernameTrigger} setTrigger={this.handleButtonClick}>
                                                <br/>
                                                <Label>New Username:</Label>
                                                <br/>
                                                <CreatePortfolioInput onChange={e => {
                                                    this.handleInputChange('username', e.target.value);
                                                }}  />
                                                <br/>
                                                <CreatePortfolioButton disabled={!this.state.username} onClick={() => {this.updateData();
                                                    this.handleButtonClick('UsernameTrigger',false)
                                                }}>Change Username</CreatePortfolioButton>
                                                <br/>
                                            </ChangeUsernameWrapper>

                                            {/**Change Password**/}
                                            <ProfileChangeButton onClick = {() => {
                                                this.handleButtonClick('PasswordTrigger',true)
                                                this.handleButtonClick('UsernameTrigger',false)
                                                this.handleButtonClick('EmailTrigger',false)

                                            }}>
                                                Change Password
                                            </ProfileChangeButton>
                                            {/**Change Password popup**/}

                                            <ChangePasswordWrapper trigger = {this.state.PasswordTrigger} setTrigger={this.handleButtonClick}>
                                                <br/>
                                                <Label>Old Password:</Label>
                                                <CreatePortfolioInput type='password' onChange={e => {
                                                    this.handleInputChange('pwd', e.target.value);
                                                }} />
                                                <br/>
                                                <Label>New Password:</Label>
                                                <CreatePortfolioInput type='password' onChange={e => {
                                                    this.handleInputChange('newPwd', e.target.value);
                                                }} />
                                                <br/>
                                                <CreatePortfolioButton disabled={!this.state.pwd || !this.state.newPwd || !(this.state.pwd===this.state.mainUser.pwd)}
                                                                       onClick={() => {this.updateData();
                                                                           this.handleButtonClick('PasswordTrigger',false)
                                                                       }}>Change Password</CreatePortfolioButton>
                                                <br/>
                                            </ChangePasswordWrapper>
                                        </ProfileButtonContainer>:""}
                                </ProfileButtonContainer>) }
                        </ProfileMediumContainer>
                    </OverViewContainer>

                    {/*Overview Containers split the DashboardBaseContainer in half. Portfolios/Leaderboard*/}
                    {/*Portfolios*/}
                    <OverViewContainer>
                        {/*Label*/}
                        <PortfolioLabel>Portfolios</PortfolioLabel>

                        {/*Actual Portfolio Container*/}
                        <PortfolioFormContainer>

                            {/*Sort Menu Button and Pop Up*/}
                            <SortMenuContainer onClick = {() => {
                                this.handleButtonClick('SortingDropDownTrigger',!this.state.SortingDropDownTrigger)
                            }}>
                                <MenuItem/>
                                <SortingPopUpWrapper trigger = {this.state.SortingDropDownTrigger} setTrigger={this.handleButtonClick}>
                                    <MenuButton>Name</MenuButton>
                                    <MenuButton>Balance</MenuButton>
                                    <MenuButton>Performance</MenuButton>
                                </SortingPopUpWrapper>
                            </SortMenuContainer>

                            {/*Container responsible for holding the actual list of Portfolios*/}
                            <PortfolioMediumContainer>
                                {!this.state.portfolios ? <CLSpinner/> :

                                <PortfolioListContainer>                                {
                                    this.state.portfolios.map( portfolio => {
                                        return(
                                            <PortfolioContainer key={portfolio.id} onClick = {() => {
                                                this.routePortfolio(portfolio.id)
                                            }}>
                                                <PortfolioOverview portfolio={portfolio}/>
                                            </PortfolioContainer>
                                        );
                                    })}
                                </PortfolioListContainer>}
                            </PortfolioMediumContainer>

                            {/**Create Portfolio Button and the Pop Up*/}
                            {/**Join Portfolio Button and the Pop Up, display iff current displayed user in the logged in user*/}

                            {!this.state.user ? "" :
                                <Container style={{width:'100%'}}>
                                    {this.state.mainUser.token === this.state.user.token ?
                                        <ButtonContainer>
                                            <DashBoardButton onClick={() => {
                                                this.handleButtonClick('JoinPortTrigger',false)
                                                this.handleButtonClick('CreatePortTrigger',true)                            }}>
                                                Create Portfolio
                                            </DashBoardButton>
                                            <DashBoardButton onClick={() => {
                                                this.handleButtonClick('JoinPortTrigger',true)
                                                this.handleButtonClick('CreatePortTrigger',false)                            }}>
                                                Join Existing Portfolio
                                            </DashBoardButton>
                                        </ButtonContainer>:""}
                                </Container> }


                            {/**Create and Join Port Wrappers**/}
                            <CreatePortfolioWrapper trigger={this.state.CreatePortTrigger} setTrigger={this.handleButtonClick}>
                                <br/>
                                <Label>Portfolio Name:</Label>
                                <br/>
                                <CreatePortfolioInput onChange={e => {
                                    this.handleButtonClick('createPortfolioName',e.target.value)
                                }}/>
                                <br/>
                                <CreatePortfolioMidContainer>
                                    <CreatePortfolioButton onClick={() => {
                                        this.handleButtonClick('portfolioVisibility','PRIVATE')
                                    }}>Private</CreatePortfolioButton>

                                    <CreatePortfolioButton onClick={() => {
                                        this.handleButtonClick('portfolioVisibility','SHARED')
                                    }}>Shared</CreatePortfolioButton>
                                </CreatePortfolioMidContainer>
                                <br/>
                                <CreatePortfolioButton onClick ={()=>{
                                    this.createPortfolio()
                                }}>+Create Portfolio</CreatePortfolioButton>
                                <br/>
                            </CreatePortfolioWrapper>

                            <JoinPortfolioWrapper trigger = {this.state.JoinPortTrigger} setTrigger = {this.handleButtonClick}>
                                <br/>
                                <Label>Portfolio Code:</Label>
                                <br/>
                                <CreatePortfolioInput onChange={e => {
                                    this.handleButtonClick('portfolioCode', e.target.value);
                                }} />
                                <br/>
                                <CreatePortfolioButton onClick={() => {
                                    this.joinPortfolio()

                                }} disabled ={!this.state.portfolioCode}>Join Portfolio</CreatePortfolioButton>
                                <br/>
                            </JoinPortfolioWrapper>

                        </PortfolioFormContainer>
                    </OverViewContainer>

                </DashboardBaseContainer>

                {/*Menu Bar Top Right*/}
                <MenuBarContainer onClick={() => {
                    this.handleButtonClick('DropDownTrigger',!this.state.DropDownTrigger)
                }}>
                    <MenuItem/>
                    <MenuPopUpWrapper trigger = {this.state.DropDownTrigger} setTrigger={this.handleButtonClick}>
                        <MenuButton onClick={() => {this.redirectToDashB();}}>Dashboard</MenuButton>
                        <MenuButton onClick={() => {this.logout();}}>Logout</MenuButton>
                    </MenuPopUpWrapper>
                </MenuBarContainer>
            </Background>
        );
    }

    redirectToDashB() {
        this.props.history.push('/dashboard');
    }

    async joinPortfolio() {
        try{
            await api.put(`/portfolios/`, {},{
            headers: {
                token: this.state.mainUser.token,
                join_code: this.state.portfolioCode
            }
        });
            this.handleButtonClick('JoinPortTrigger',false)
            this.handleButtonClick('portfolioCode',null)}
        catch (error){
            alert(error.response.data.message)
        }
    }

    routePortfolio(id){
        this.props.history.push('/portfolio/' + id);
    }
}

export default withRouter(Profile);