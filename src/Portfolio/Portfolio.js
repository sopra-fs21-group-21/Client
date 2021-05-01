import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {FormContainer} from "../Design/FormContainer";
import {Label} from "../Design/Label";
import {Button} from "../Design/Button";
import {ListContainer} from "../Design/ListContainer"
import {ListElement} from "../Design/ListElement"
import MenuItem from "../Design/MenuItem";
import MenuPopUpWrapper from "../Design/Wrappers/MenuPopUpWrapper";
import ClosePositionWrapper from "../Design/Wrappers/ClosePositionWrapper";
import OpenPositionWrapper from "../Design/Wrappers/OpenPositionWrapper";
import TraderOverview from "../Base Components/TraderOverview";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import PositionOverview from "../Base Components/PositionOverview";
import ClosePosition from "../Design/WrapperContent/ClosePosition";
import OpenPosition from "../Design/WrapperContent/OpenPosition";
import {api} from "../helpers/api";
import User from "../models/User";

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
const PortfolioFormContainer = styled(FormContainer)`
  width: 85%;
  height: 55vh;
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
  margin-left: 10%;
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
  margin-bottom: 3%;
  margin-left: -5%;
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
  font-weight: 500;
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

const TraderListContainer = styled(ListContainer)`
  padding: 0;
  margin: 0;
  width: 100%;
`

const TraderListElement = styled(ListElement)`
  background-color: #5B4949;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 5%;
  border-radius: 25px;
  width: 90%;
`

const PositionListElement = styled(ListElement)`
  background-color: #5B4949;
  margin-top: 2vh;
  margin-bottom: 2vh;
  border-radius: 25px;
  width: 100%;
  margin-left: -2.5%;
`

const PositionLabelContainer = styled.div`
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: -5%;
`

const TraderMidFormContainer = styled(FormContainer)`
  width: 85%;
  height: 80%;
  border-radius: 25px;
  margin-left: 10%;
  margin-right: 5%;
  margin-top: 3%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const PositionLabel = styled(Label)`
`

const OpenPositionContainer = styled.div`
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`

const OpenPositionButton = styled(Button)`
    width: 60%;
    height: 11%;
`

const parsedUser = new User(JSON.parse(localStorage.getItem('user')))

class Dashboard extends React.Component{
    constructor(props){
        super(props);

        const testTrader1 = {
            'status': 'online',
            'username': 'kareem',
            'id': 1
        }

        const testTrader2 = {
            'status': 'offline',
            'username': 'vuki',
            'id': 2
        }

        const portfolioInfo = {
            'id': 1,
            'balance': 2000,
            'name': 'Vuki',
            'performance': '-20%',
            'visibility': 'private',
            'code': '1234',
            'owner': 'chantaloons'
        }

        const testPosition1 = {
            'id': 1,
            'code': 'AAAA',
            'amount':20,
            'type': 'Short'
        }

        const testPosition2 = {
            'id': 2,
            'code': 'BBBB',
            'amount':200,
            'type': 'Long'
        }

        const testPosition3 = {
            'id': 3,
            'code': 'CCCC',
            'amount':5,
            'type': 'Short'
        }

        this.state = {
            portfolio: [],
            traders: [],
            positions: [testPosition1,testPosition2],
            ClosePositionTrigger: false,
            OpenPositionTrigger: false,
            mainUser:parsedUser
        }

        this.handleButtonClick=this.handleButtonClick.bind(this);
    }

    profile(){
        this.props.history.push('/profile');
    }

    handleButtonClick(key,bool) {
        this.setState({ [key]: bool });
    }

    async componentDidMount(){
        let testId = this.props.match.params.id;
        await this.getPortfolio(testId);
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
                            <TraderListContainer>
                                {this.state.traders.map( trader => {
                                return(
                                <TraderListElement key={trader.id}>
                                    <TraderOverview trader={trader}/>
                                </TraderListElement>
                                );
                            })}
                            </TraderListContainer>
                        </MidFormContainer>
                    </OverViewContainer>

                    {/*Positions*/}
                    <OverViewContainer>

                        {/*Labels*/}
                        <BalanceLabelContainer>
                            <BalanceLabel>current balance: {this.state.portfolio.balance} CHF</BalanceLabel>
                        </BalanceLabelContainer>

                        <PositionLabelContainer>
                            <PositionLabel>Open Positions</PositionLabel>
                        </PositionLabelContainer>

                        {/*List of Positions including the close Position element and the open position button*/}
                        <PortfolioFormContainer>
                            <TraderMidFormContainer>
                                <TraderListContainer>
                                    {this.state.positions.map( position => {
                                        return(
                                            <PositionListElement key={position.id}>
                                                <PositionOverview position={position} setTrigger={this.handleButtonClick}/>
                                            </PositionListElement>
                                        );
                                    })}
                                </TraderListContainer>

                                <OpenPositionContainer>
                                    <OpenPositionButton
                                    onClick = {() => {this.handleButtonClick('OpenPositionTrigger',true);
                                    }}
                                    >Open Position</OpenPositionButton>
                                </OpenPositionContainer>

                                <OpenPositionWrapper trigger={this.state.OpenPositionTrigger} setTrigger={this.handleButtonClick}>
                                    <OpenPosition/>
                                </OpenPositionWrapper>

                                <ClosePositionWrapper trigger={this.state.ClosePositionTrigger} setTrigger={this.handleButtonClick}>
                                    <ClosePosition/>
                                </ClosePositionWrapper>
                            </TraderMidFormContainer>
                        </PortfolioFormContainer>
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

    async getPortfolio(id) {
        const requestUrl = 'portfolios/' + id;
        const tempUser = new User(JSON.parse(localStorage.getItem('user')));

        const response = await api.get(requestUrl, {
            headers: {
                token: tempUser.token
            }
        });

        console.log(response.data);

        const portfolioInfo = {
            'id': response.data.id,
            'balance': response.data.cash,
            'name': response.data.name,
            'performance': response.data.weeklyPerformance,
            'visibility': response.data.portfolioVisibility,
            'code': response.data.joinCode,
            'owner': response.data.owner.username
        }

        this.setState({'portfolio': portfolioInfo});

        const tempTraders = response.data.traders;

        this.setState({'traders': tempTraders});

        console.log(this.state.traders);

    }

}

export default withRouter(Dashboard);