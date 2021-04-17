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
import {DropDownContainer} from "../../views/Containers/DropDownContainer";
import {HamburgerWrapper} from "../../views/SVGS/HamburgerWrapper";
import {BlackPopupInner} from "../../views/PopUps/BlackPopupInner";
import {ButtonContainer} from "../../views/Containers/ButtonContainer";
import {Button} from "../../views/design/Button";
import {InputField} from "../../views/design/InputField";


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

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;



const Container = styled.div`
  width:800px;
  min-height: 400px;
  height:auto;
  margin-left: 20px;
  position: relative;
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






class DashBoard extends React.Component {

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

                    <HamburgerWrapper style={{marginLeft:'150px'}} onClick={() => {
                        this.handleButtonClick('DropDownTrigger',true); }}>
                        <HamburgerMenuItem/>
                    </HamburgerWrapper>

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

                        <Container >
                            <Label>PORTFOLIOS</Label>

                            <PortLeadCont>
                                <HamburgerWrapper style={{marginLeft:'640px'}} onClick={() => {
                                         this.handleButtonClick('SortingDropDownTrigger',!this.state.SortingDropDownTrigger); }}>
                                    <HamburgerMenuItem/>
                                </HamburgerWrapper>

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

                                <ButtonContainer    style={{marginTop:'120px'}}>
                                    <Button onClick={() => {

                                        this.handleButtonClick('CreatePortTrigger',true);
                                    }}> + CREATE NEW</Button>


                                    <Button onClick={() => {
                                        this.handleButtonClick('JoinPortTrigger',true);
                                    }}>JOIN PORTFOLIO</Button>

                                </ButtonContainer>

                            </PortLeadCont>
                        </Container>




                        <Container>
                            <Label>Leaderboard</Label>

                            <PortLeadCont>
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
export default withRouter(DashBoard);
