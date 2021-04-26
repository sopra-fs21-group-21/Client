import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {FormContainer} from "../Design/FormContainer";
import {Label} from "../Design/Label";
import {Button} from "../Design/Button";
import MenuItem from "../Design/MenuItem";
import MenuPopUpWrapper from "../Design/Wrappers/MenuPopUpWrapper";
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

const MidFormContainer = styled(FormContainer)`
  width: 85%;
  height: 27vh;
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

const OverViewContainer = styled.div`
    height: 100%;
    width: 50%;
    flex-direction: column;
`

const MenuButton = styled(Button)`
  width: 100%;
  margin-top: 20%;
  height: 5%;
  padding: 5px;
  outline: black;
  border-style: solid;
`

const NameContainer = styled.div`
  width: 100%;
  height: 10%;
  margin-bottom: 5%;
  margin-top: -4%;
`

const NameLabel = styled.label`
  font-size: 25px;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  margin-left: 7%;
`

const LabelContainer = styled.div`
  width: 100%;
  height: 3%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BalanceLabelContainer = styled.div`
  width: 100%;
  height: 7%;
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const PortfolioLabel = styled(Label)`
  font-size: 18px;
`

const BalanceLabel = styled(Label)`
  margin-left: 5%;
  font-size: 23px;
`

const PortfolioInfo = styled(Label)`
  font-size: 19px;
  text-transform: none;
  color: black;
  width: 100%;
  font-weight: 400;
  margin-left: 6%;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
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

class Dashboard extends React.Component{
    constructor(props){
        super(props);

        const portfolioInfo = {
            'id': 1,
            'balance': 2000,
            'name': 'Vuki',
            'performance': '-20%',
            'visibility': 'private',
            'code': '1234',
            'owner': 'chantaloons'
        };

        this.state = {
            portfolio: portfolioInfo
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

                        {/*Labels*/}
                        <NameContainer>
                            <NameLabel>portfolio {this.state.portfolio.name}</NameLabel>
                        </NameContainer>
                        <LabelContainer>
                            <PortfolioLabel>general information</PortfolioLabel>
                        </LabelContainer>

                        {/*General Information*/}
                        <MidFormContainer>
                            <PortfolioInfo>Portfolio ID: {this.state.portfolio.id}</PortfolioInfo>
                            <PortfolioInfo>Owner: {this.state.portfolio.owner}</PortfolioInfo>
                            <PortfolioInfo>Portfolio Code: {this.state.portfolio.code}</PortfolioInfo>
                            <PortfolioInfo>Portfolio Visibility: {this.state.portfolio.visibility}</PortfolioInfo>
                            <PortfolioInfo>Portfolio Performance: {this.state.portfolio.performance}</PortfolioInfo>
                        </MidFormContainer>

                        {/*Another Label*/}
                        <LabelContainer>
                            <PortfolioLabel>traders</PortfolioLabel>
                        </LabelContainer>

                        {/*Traders*/}
                        <MidFormContainer>
                        </MidFormContainer>
                    </OverViewContainer>

                    {/*Leaderboard*/}
                    <OverViewContainer>
                        <BalanceLabelContainer>
                            <BalanceLabel>current balance: {this.state.portfolio.balance}$</BalanceLabel>
                        </BalanceLabelContainer>
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
                        {/**create portfolio popup**/}
                        <MenuButton onClick = {() => {
                            this.handleButtonClick('CreatePortTrigger',true)
                            this.handleButtonClick('JoinPortTrigger',false)}}>Create Portfolio</MenuButton>
                        {/**join portfolio popup**/}
                        <MenuButton onClick = {() => {
                            this.handleButtonClick('JoinPortTrigger',true)
                            this.handleButtonClick('CreatePortTrigger',false)}}>Join Portfolio</MenuButton>
                        {/**redirect to profile**/}
                        <MenuButton onClick={()=>{this.profile();}}>
                            My Profile</MenuButton>
                        {/**log out user to profile**/}
                        <MenuButton onClick={() => {this.logout();}}>Logout</MenuButton>
                    </MenuPopUpWrapper>
                </MenuBarContainer>
            </Background>
        );
    }
    logout(){
        if (localStorage.getItem('user'))
            localStorage.removeItem('user')
        this.props.history.push('/login');
    }
}

export default withRouter(Dashboard);