import {Background} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/Background';
import {BaseContainer} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/BaseContainer';
import {FormContainer} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/FormContainer';
import {ListContainer} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/ListContainer';
import {ListElement} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/ListElement';
import PortfolioOverview from 'C:/Users/chant/Desktop/group-21-sopra/src/Base Components/PortfolioOverview';
import {Label} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/Label';
import {InputField} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/InputField';
import {Button} from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/Button';
import MenuItem from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/MenuItem';
import MenuPopUpWrapper from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/Wrappers/MenuPopUpWrapper';
import SortingPopUpWrapper from 'C:/Users/chant/Desktop/group-21-sopra/src/Design/Wrappers/SortingPopUpWrapper';
import CreatePortfolioWrapper from "../Design/Wrappers/CreatePortfolioWrapper";
import JoinPortfolioWrapper from "../Design/Wrappers/JoinPortfolioWrapper";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";

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
const LeaderboardFormContainer = styled(FormContainer)`
  width: 85%;
  height: 70vh;
  border-radius: 25px;
  margin-left: 5%;
  margin-right: 10%;
  margin-top: 3%;
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

const DashBoardButton = styled(Button)`
  width: 55%;
  margin-bottom: 4%;
  height: 5%;
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

const LeaderboardLabel = styled(Label)`
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
`

class Dashboard extends React.Component{
    constructor(props){
        super(props);

        const portfolioVuki = {
            'id': 1,
            'balance': 2000,
            'name': 'Vuki',
            'performance': '-20%'
        };

        const portfolioKarim = {
            'id': 2,
            'balance': 4000,
            'name': 'Karim',
            'performance': '+40%'
        };

        const portfolioAle = {
            'id': 3,
            'balance': 69,
            'name': 'Alessandro',
            'performance': '-69%'
        };

        this.state = {
            portfolios: [portfolioVuki,portfolioKarim,portfolioAle],
            CreatePortTrigger: false,
            JoinPortTrigger: false,
            DropDownTrigger: false,
            SortingDropDownTrigger: false
        }

        this.handleButtonClick=this.handleButtonClick.bind(this);
    }

    profile(){
        this.props.history.push('/profile');
    }

    handleButtonClick(key,bool) {
        this.setState({ [key]: bool });
    }

    render(){
        return(
            <Background>

                {/*Dashboard Container containing the Leaderboard, Portfolio as well as the labels*/}
                <DashboardBaseContainer>

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
                                <PortfolioListContainer>                                {
                                    this.state.portfolios.map( portfolio => {
                                        return(
                                            <PortfolioContainer key={portfolio.id}>
                                                <PortfolioOverview portfolio={portfolio}/>
                                            </PortfolioContainer>
                                        );
                                    })}
                                </PortfolioListContainer>
                            </PortfolioMediumContainer>

                            {/*Create Portfolio Button and the Pop Up*/}
                            <DashBoardButton onClick = {() => {
                                this.handleButtonClick('CreatePortTrigger',true)
                            }}>
                            Create Portfolio
                            </DashBoardButton>

                            <CreatePortfolioWrapper trigger={this.state.CreatePortTrigger} setTrigger ={this.handleButtonClick}>
                                <br/>
                                <Label>Portfolio Name:</Label>
                                <br/>
                                <CreatePortfolioInput/>
                                <br/>
                                <CreatePortfolioMidContainer>
                                    <CreatePortfolioButton>Private</CreatePortfolioButton>
                                    <CreatePortfolioButton>Shared</CreatePortfolioButton>
                                </CreatePortfolioMidContainer>
                                <br/>
                                <CreatePortfolioButton>+Create Portfolio</CreatePortfolioButton>
                                <br/>
                            </CreatePortfolioWrapper>

                            {/*Join Portfolio Button and the Pop Up*/}
                            <DashBoardButton onClick={() => {
                                this.handleButtonClick('JoinPortTrigger',true)
                            }}>
                            Join Existing Portfolio
                            </DashBoardButton>

                            <JoinPortfolioWrapper trigger = {this.state.JoinPortTrigger} setTrigger = {this.handleButtonClick}>
                                <br/>
                                <Label>Portfolio Code:</Label>
                                <br/>
                                <CreatePortfolioInput/>
                                <br/>
                                <CreatePortfolioButton>Join Portfolio</CreatePortfolioButton>
                                <br/>
                            </JoinPortfolioWrapper>

                        </PortfolioFormContainer>
                    </OverViewContainer>

                    {/*Leaderboard*/}
                    <OverViewContainer>
                        <LeaderboardLabel>Leaderboard</LeaderboardLabel>
                        <LeaderboardFormContainer>
                        </LeaderboardFormContainer>
                    </OverViewContainer>

                </DashboardBaseContainer>

                {/*Menu Bar Top Right*/}
                <MenuBarContainer onClick={() => {
                    this.handleButtonClick('DropDownTrigger',!this.state.DropDownTrigger)
                }}>
                    <MenuItem/>
                    <MenuPopUpWrapper trigger = {this.state.DropDownTrigger} setTrigger={this.handleButtonClick}>
                        <MenuButton>Create Portfolio</MenuButton>
                        <MenuButton>Join Portfolio</MenuButton>
                        <MenuButton onClick={()=>{
                            this.profile();
                        }}>
                            My Profile</MenuButton>
                        <MenuButton>Logout</MenuButton>
                    </MenuPopUpWrapper>
                </MenuBarContainer>
            </Background>
        );
    }
}

export default withRouter(Dashboard);