import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { withRouter } from 'react-router-dom';
import JoinPortfolio from "../popups/JoinPortfolio";
import CreatePortfolio from "../popups/CreatePortfolio";
import HamburgerMenuItem from "../HamburgerMenuItem/HamburgerMenuItem";
import DropDown from "../popups/DropDown";
import SortingDropDown from "../popups/SortingDropDown";
import NewEmail from "../popups/NewEmail";
import {BlackPopupInner} from "../../views/PopUps/BlackPopupInner";
import NewPwd from "../popups/NewPwd";
import NewUserName from "../popups/NewUserName";
import ProfileInfoToChange from "../../views/PopUps/ProfileInfoToChange";
import {InputField} from "../../views/design/InputField";
import {Label} from "../../views/design/Label";
import {Button} from "../../views/design/Button";
import {DropDownContainer} from "../../views/Containers/DropDownContainer";



const FormContainer = styled.div`
  position:absolute;
  top:150px;
  margin-top: 2em;
  display: flex;
  margin-right:200px;

  flex-direction: column;
  align-items: center;
  min-height: 400px;
  justify-content: center;
`;



const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1500px;
  height:700px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 80px;
  background: rgb(29, 26, 26);
  align-items:center;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const PortLeadCont = styled.div`
  position: relative;
  min-height: 500px;
  height: auto;
  width:100%;
  border: none;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  background: rgb(246, 240, 240);
  color: rgb(29, 26, 26);
  display: flex;
  flex-direction: column;
  
`;




const Container = styled.div`
  width:800px;
  min-height: 400px;
  height:auto;
  margin-left: 20px;
  position: relative;
`;







const ButtonContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15px;
`;

const PortFolios = styled.div`
    width:80%;
    background:rgb(196,196,196);
    color:rgb(0,0,0);
    border: none;
    border-radius: 20px;
    display:flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 10px;
`;

const PortfoliosCont = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;






class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CreatePortTrigger: false,
            JoinPortTrigger: false,
            DropDownTrigger: false,
            SortingDropDownTrigger: false,
            NewEmailTrigger:false,
            NewPwdTrigger:false,
            NewUserNameTrigger:false

        };

        this.handleButtonClick=this.handleButtonClick.bind(this);
    }
    componentDidMount() {}

    handleButtonClick(key,bool) {
        this.setState({ [key]: bool });
    }

    render() {
        return (
            <BaseContainer>

                <DropDownContainer>

                    <div style={{width:'40px', height:'40px', marginBottom:'10px', paddingLeft:'160px'}} onClick={() => {
                        this.handleButtonClick('DropDownTrigger',true); }}>
                        <HamburgerMenuItem/>
                    </div>

                    <DropDown trigger={this.state.DropDownTrigger} setTrigger={this.handleButtonClick}>
                        <ButtonContainer>
                            <Button style={{width:'150px'}} onClick={() => {
                                this.handleButtonClick('JoinPortTrigger',!this.state.JoinPortTrigger);
                            }}>
                                JOIN PORTFOLIO
                            </Button>
                            <Button style={{width:'150px'}} onClick={() => {

                                this.handleButtonClick('CreatePortTrigger',!this.state.CreatePortTrigger);
                            }}>
                                NEW PORTFOLIO
                            </Button>
                            <Button style={{width:'150px'}}>
                                VIEW MY PROFILE
                            </Button>
                            <Button style={{width:'150px'}}>
                                LOGOUT
                            </Button>


                        </ButtonContainer>

                    </DropDown>

                </DropDownContainer>



                <FormContainer>
                    <Form>

                        <Container style={{marginBottom:'150px'}}>
                            <div>
                                <img width="18" alt="Green sphere" src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Green_sphere.png"/>
                                <Label>Online</Label>
                            </div>
                            <div style={{display:"flex", flexDirection:'row'}}>
                                <div style={{display:"flex", flexDirection:'row'}}>
                                    <Label style={{marginTop:'10px'}}>USERNAME: Karim31</Label>
                                    <Label>EMAIL: kareem318199@gmail.com</Label>
                                    <Label>CREATED: 31.08.2012</Label>
                                </div>
                                <ButtonContainer style={{marginLeft:'200px'}}>


                                    <Button style={{width:'150px'}} onClick={() => {
                                        this.handleButtonClick('NewUserNameTrigger',true); }}>CHANGE USERNAME</Button>


                                    <Button style={{width:'150px'}} onClick={() => {
                                        this.handleButtonClick('NewEmailTrigger',true); }}>CHANGE EMAIL</Button>

                                    <Button style={{width:'150px'}} onClick={() => {
                                        this.handleButtonClick('NewPwdTrigger',true); }}>CHANGE PASSWORD</Button>


                                </ButtonContainer>
                            </div>

                        </Container>


                        <Container>
                            <Label>PORTFOLIOS</Label>

                            <PortLeadCont>
                                <div style={{width:'40px',
                                    height:'40px',
                                    marginBottom:'10px', marginLeft:'640px', zIndex:'1'}}
                                     onClick={() => {
                                         this.handleButtonClick('SortingDropDownTrigger',!this.state.SortingDropDownTrigger); }}>
                                    <HamburgerMenuItem/>
                                </div>

                                <SortingDropDown trigger={this.state.SortingDropDownTrigger} setTrigger={this.handleButtonClick}>
                                    <ButtonContainer>
                                        <Button style={{width:'150px'}} >NAME</Button>
                                        <Button style={{width:'150px'}}>BALANCE</Button>
                                        <Button style={{width:'150px'}}>PERFORMANCE</Button>

                                    </ButtonContainer>
                                </SortingDropDown>

                                <PortfoliosCont>
                                    <PortFolios>
                                        <p>NAME: </p>
                                        <p>BALANCE: </p>
                                        <p>PERFORMANCE:</p>
                                    </PortFolios>

                                    <PortFolios>
                                        <p>NAME: </p>
                                        <p>BALANCE: </p>
                                        <p>PERFORMANCE:</p>
                                    </PortFolios>
                                    <PortFolios>
                                        <p>NAME: </p>
                                        <p>BALANCE: </p>
                                        <p>PERFORMANCE:</p>
                                    </PortFolios>


                                </PortfoliosCont>

                                <ButtonContainer    style={{paddingTop:'120px'}}
                                >
                                    <Button onClick={() => {

                                        this.handleButtonClick('CreatePortTrigger',true);
                                    }}> + CREATE NEW</Button>


                                    <Button onClick={() => {
                                        this.handleButtonClick('JoinPortTrigger',true);
                                    }}>JOIN PORTFOLIO</Button>

                                </ButtonContainer>

                            </PortLeadCont>
                        </Container>








                        <CreatePortfolio trigger={this.state.CreatePortTrigger} setTrigger={this.handleButtonClick}>
                            <BlackPopupInner>
                                <Label style={{marginTop:'18px'}}>PORTFOLIO NAME</Label>
                                <InputField style={{width:'90%'}}/>
                                <div style={{display:'flex', flexDirection: 'row',
                                    width:'100%', justifyContent:'center',
                                    marginBottom:"20px"}}>
                                    <Button style={{width:'40%'}}>PRIVATE</Button>
                                    <Button style={{width:'40%',marginLeft:'14px'}}>SHARED</Button>
                                </div>
                                <Button>+ CREATE PORTFOLIO </Button>
                            </BlackPopupInner>
                        </CreatePortfolio>



                        <JoinPortfolio trigger={this.state.JoinPortTrigger} setTrigger={this.handleButtonClick}>
                            <BlackPopupInner>
                                <Label>Portfolio invite code</Label>
                                <InputField style={{width:'80%', marginTop:'12px'}}/>
                                <Button> JOIN PORTFOLIO</Button>
                            </BlackPopupInner>
                        </JoinPortfolio>



                        <NewEmail trigger={this.state.NewEmailTrigger} setTrigger={this.handleButtonClick}>
                            <BlackPopupInner>
                                <ProfileInfoToChange InfoToChange={'Email'} type={"email"}/>
                                <ButtonContainer>
                                    <Button>CONFIRM</Button>
                                </ButtonContainer>
                            </BlackPopupInner>
                        </NewEmail>

                        <NewUserName trigger={this.state.NewUserNameTrigger} setTrigger={this.handleButtonClick}>
                            <BlackPopupInner>
                                <ProfileInfoToChange InfoToChange={'Username'} type={"text"}/>
                                <ButtonContainer>
                                    <Button>CONFIRM</Button>
                                </ButtonContainer>
                            </BlackPopupInner>
                        </NewUserName>

                        <NewPwd trigger={this.state.NewPwdTrigger} setTrigger={this.handleButtonClick}>
                            <BlackPopupInner>
                                <ProfileInfoToChange InfoToChange={'Password'} type={"password"}/>
                                <ButtonContainer>
                                    <Button>CONFIRM</Button>
                                </ButtonContainer>
                            </BlackPopupInner>
                        </NewPwd>





                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(UserProfile);
