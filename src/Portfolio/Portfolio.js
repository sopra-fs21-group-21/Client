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
import ChatPopUpWrapper from "../Design/Wrappers/ChatPopUpWrapper";
import TraderOverview from "../Base Components/TraderOverview";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import PositionOverview from "../Base Components/PositionOverview";
import ClosePosition from "../Design/WrapperContent/ClosePosition";
import OpenPosition from "../Design/WrapperContent/OpenPosition";
import Chat from "../Design/WrapperContent/Chat";
import ChatBubble from "../Design/SVGs/ChatBubble";
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
  font-size: 17px;
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
  min-width: 4vw;
  min-height: 100vh;
`

const ChatBubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  min-width: 4vw;
  min-height: 100vh;
  padding-top: 4vh;
  padding-left: 2vw;
  margin-right: 1%;
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
    min-height: 3vh;
    &:focus {
      background-color: rgba(255,173,78,0.8);
      box-shadow: 1px 1px 3px 2px rgba(255, 173, 0, 0.3);
    }
`

const ChatButtonWrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
  min-height: 2vh;
  align-items: center;
  justify-content: flex-start;
`

const parsedUser = new User(JSON.parse(localStorage.getItem('user')))

class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            portfolio: [],
            traders: [],
            positions: [],
            ClosePositionTrigger: false,
            OpenPositionTrigger: false,
            ChatTrigger: false,
            mainUser:parsedUser,
            closePositionId: null,
            allowChanges: false
        }

        this.handleButtonClick=this.handleButtonClick.bind(this);
        this.getPortfolio=this.getPortfolio.bind(this);
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

        await this.setPermissions(testId)
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
                                <TraderListElement key={trader.id} onClick={()=>{
                                    this.routeProfile(trader.id)
                                }}>
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
                            {this.state.portfolio.balance != undefined ?
                            <BalanceLabel>current balance: {this.state.portfolio.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF</BalanceLabel>:""}
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
                                                <PositionOverview position={position} setTrigger={this.handleButtonClick} allowChanges={this.state.allowChanges}/>
                                            </PositionListElement>
                                        );
                                    })}
                                </TraderListContainer>

                                <OpenPositionContainer>
                                    <OpenPositionButton
                                    onClick = {() => {this.handleButtonClick('OpenPositionTrigger',true);
                                    }}
                                    disabled = {!this.state.allowChanges}
                                    >Open Position</OpenPositionButton>
                                </OpenPositionContainer>

                                <OpenPositionWrapper trigger={this.state.OpenPositionTrigger} setTrigger={this.handleButtonClick}>
                                    <OpenPosition portfolio = {this.state.portfolio} setTrigger = {this.handleButtonClick} reloadPortfolio={this.getPortfolio}/>
                                </OpenPositionWrapper>

                                <ClosePositionWrapper trigger={this.state.ClosePositionTrigger} setTrigger={this.handleButtonClick}>
                                    <ClosePosition positionId = {this.state.closePositionId} portfolioId = {this.state.portfolio.id} setTrigger={this.handleButtonClick} reloadPortfolio={this.getPortfolio}/>
                                </ClosePositionWrapper>
                            </TraderMidFormContainer>
                        </PortfolioFormContainer>
                    </OverViewContainer>
                </DashboardBaseContainer>

                {/*Chat Menu Top Right*/}
                <ChatBubbleContainer>
                    <ChatButtonWrapper onClick={() => {
                        this.handleButtonClick('ChatTrigger',true)
                    }}>
                        <ChatBubble/>
                    </ChatButtonWrapper>
                    <ChatPopUpWrapper trigger = {this.state.ChatTrigger} setTrigger={this.handleButtonClick}>
                        <Chat portfolio = {this.state.portfolio}/>
                    </ChatPopUpWrapper>
                </ChatBubbleContainer>

                {/*Menu Bar Top Right*/}
                <MenuBarContainer onClick={() => {
                    this.handleButtonClick('DropDownTrigger',!this.state.DropDownTrigger)
                }}>
                    <MenuItem/>
                    <MenuPopUpWrapper trigger = {this.state.DropDownTrigger} setTrigger={this.handleButtonClick}>
                        {/**redirect to dashboard**/}
                        <MenuButton onClick={() => {this.redirectToDashB();}}>Dashboard</MenuButton>
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
            'balance': response.data.balance,
            'name': response.data.name,
            'performance': response.data.weeklyPerformance,
            'visibility': response.data.portfolioVisibility,
            'code': response.data.joinCode,
            'owner': response.data.owner.username
        }

        this.setState({'portfolio': portfolioInfo});

        const tempTraders = response.data.traders;

        this.setState({'traders': tempTraders});

        this.setState({'positions': response.data.positions});

        console.log(this.state.traders);

    }

    redirectToDashB() {
        this.props.history.push('/dashboard');
    }

    routeProfile(id) {
        const pathUrl = '/profile/' + id;
        this.props.history.push(pathUrl);
    }

    async setPermissions(portId){
        const tempUser = new User(JSON.parse(localStorage.getItem('user')));

        const requestUrl = 'users/' + tempUser.id;
        const response = await api.get(requestUrl, {});

        const tempPorts = response.data.collaboratingPortfolios;
        const tempPorts2 = response.data.ownedPortfolios;
        const tempPorts3 = tempPorts.concat(tempPorts2)

        tempPorts3.forEach(element => {
                if(element.id == portId){
                    this.setState({'allowChanges':true});
                }
            }
        );

        console.log(this.state.allowChanges);
    }
}

export default withRouter(Dashboard);