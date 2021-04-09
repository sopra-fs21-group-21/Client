import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';

import JoinPortfolio from "../popups/JoinPortfolio";
import CreatePortfolio from "../popups/CreatePortfolio";
import HamburgerMenuItem from "../HamburgerMenuItem/HamburgerMenuItem";
import DropDown from "../popups/DropDown";
import SortingDropDown from "../popups/SortingDropDown";


export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  width: 50%;
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(255, 173, 78);
  transition: all 0.3s ease;
  margin-top: 10px;
`;


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

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  width:100%;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgb(246, 240, 240);
  color: rgb(29, 26, 26);
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

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
`;



const Container = styled.div`
  width:800px;
  min-height: 400px;
  height:auto;
  margin-left: 20px;
  position: relative;
`;

const InnerPopContainer = styled.div`
  display: flex;
  flex-direction: column;
    justify-content: center;
    align-items:center;

  width:448px;
  height:250px;
  background: rgb(29,26,26);
  border: none;
  border-radius: 20px;
  
`;






const ButtonContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const DropDownContainer = styled.div`
  width:200px;
  height: 300px;
  display: flex;
  padding-left:1300px;
  flex-direction: column;
  justify-content:Center;
  position:absolute;
  z-index: 1;
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
            SortingDropDownTrigger: false
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
                                this.handleButtonClick('JoinPortTrigger',true);
                            }}>
                                JOIN PORTFOLIO
                            </Button>
                            <Button style={{width:'150px'}} onClick={() => {

                                this.handleButtonClick('CreatePortTrigger',true);
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
                                <div style={{display:"flex", flexDirection:'column'}}>
                                    <Label style={{marginTop:'10px'}}>USERNAME: Karim31</Label>
                                    <Label>EMAIL: kareem318199@gmail.com</Label>
                                    <Label>CREATED: 31.08.2012</Label>
                                </div>
                                <ButtonContainer style={{marginLeft:'200px'}}>
                                    <Button style={{width:'150px'}}>CHANGE USERNAME</Button>
                                    <Button style={{width:'150px'}}>CHANGE EMAIL</Button>
                                    <Button style={{width:'150px'}}>CHANGE PASSWORD</Button>
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
                                        <Button style={{width:'150px'}}>NAME</Button>
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
                            <InnerPopContainer>
                                <Label style={{marginTop:'18px'}}>PORTFOLIO NAME</Label>
                                <InputField style={{width:'90%'}}/>
                                <div style={{display:'flex', flexDirection: 'row',
                                    width:'100%', justifyContent:'center',
                                    marginBottom:"20px"}}>
                                    <Button style={{width:'40%'}}>PRIVATE</Button>
                                    <Button style={{width:'40%',marginLeft:'14px'}}>SHARED</Button>
                                </div>
                                <Button>+ CREATE PORTFOLIO </Button>
                            </InnerPopContainer>
                        </CreatePortfolio>



                        <JoinPortfolio trigger={this.state.JoinPortTrigger} setTrigger={this.handleButtonClick}>
                            <InnerPopContainer>
                                <Label>Portfolio invite code</Label>
                                <InputField style={{width:'80%', marginTop:'12px'}}/>
                                <Button> JOIN PORTFOLIO</Button>
                            </InnerPopContainer>
                        </JoinPortfolio>





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
