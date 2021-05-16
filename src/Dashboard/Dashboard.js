import {Background} from "../Design/Background";
import {BaseContainer} from "../Design/BaseContainer";
import {FormContainer} from "../Design/FormContainer";
import {ListContainer} from "../Design/ListContainer";
import {ListElement} from "../Design/ListElement";
import PortfolioOverview from "../Base Components/PortfolioOverview";
import {Label} from "../Design/Label";
import {InputField} from "../Design/InputField";
import {Button} from "../Design/Button";
import MenuItem from "../Design/MenuItem";
import MenuPopUpWrapper from "../Design/Wrappers/MenuPopUpWrapper";
import SortingPopUpWrapper from "../Design/Wrappers/SortingPopUpWrapper";
import CreatePortfolioWrapper from "../Design/Wrappers/CreatePortfolioWrapper";
import JoinPortfolioWrapper from "../Design/Wrappers/JoinPortfolioWrapper";
import {withRouter} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import User from "../models/User";
import {api} from "../helpers/api";
import CLSpinner from "../Design/CLSpinner";

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
    overflow-y: scroll;
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

        const user = new User(JSON.parse(localStorage.getItem('user')))
        console.log(user)


        this.state = {
            portfolios: null,
            CreatePortTrigger: false,
            JoinPortTrigger: false,
            DropDownTrigger: false,
            SortingDropDownTrigger: false,
            user: user,
            portfolioCode: null,
            createPortfolioName: null,
            portfolioVisibility: 'private',
            allPublicPorts: null
        }

        this.handleButtonClick=this.handleButtonClick.bind(this);
    }

    async componentDidMount(){
        await this.getPortfolios();
        await this.getAllPublicPortfolios();
    }

    profile(){
        this.props.history.push(`/profile/${this.state.user.id}`, {user:this.state.user});
    }

    routePortfolio(id){
        this.props.history.push('portfolio/' + id);
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

                            {/*Create Portfolio Button and the Pop Up*/}
                            <DashBoardButton onClick = {() => {
                                this.handleButtonClick('CreatePortTrigger',true)
                                this.handleButtonClick('JoinPortTrigger',false)
                            }}>
                            Create Portfolio
                            </DashBoardButton>

                            <CreatePortfolioWrapper trigger={this.state.CreatePortTrigger} setTrigger ={this.handleButtonClick}>
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
                                    }}>
                                        Private</CreatePortfolioButton>

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

                            {/**Join Portfolio Button and the Pop Up*/}
                            <DashBoardButton onClick={() => {
                                this.handleButtonClick('JoinPortTrigger',true)
                                this.handleButtonClick('CreatePortTrigger',false)
                            }}>
                            Join Existing Portfolio
                            </DashBoardButton>

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

                    {/*Leaderboard*/}
                    <OverViewContainer>

                        <LeaderboardLabel>Leaderboard</LeaderboardLabel>

                        <PortfolioFormContainer>
                            <Label style={{color:'#D86969'}}>THIS LEADERBOARD CONTAINS ALL AVAILABLE PUBLIC PORTFOLIOS, SORTED BY WEEKLY PERFORMANCE: </Label>

                            <PortfolioMediumContainer>
                                {!this.state.allPublicPorts ? <CLSpinner/> :
                                    <PortfolioListContainer>                                {
                                        this.state.allPublicPorts.map( portfolio => {
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
                        </PortfolioFormContainer>
                    </OverViewContainer>

                </DashboardBaseContainer>

                {/*Menu Bar Top Right*/}
                <MenuBarContainer onClick={() => {
                    this.handleButtonClick('DropDownTrigger',!this.state.DropDownTrigger)
                }}>
                    <MenuItem/>
                    <MenuPopUpWrapper trigger = {this.state.DropDownTrigger} setTrigger={this.handleButtonClick}>
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
                /**change the user status to offline**/
                await api.put(`/users/logout`, {},{
                    headers: {
                        token: this.state.user.token
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

    async joinPortfolio() {
        try{await api.put(`/portfolios/`, {},{
            headers: {
                token: this.state.user.token,
                join_code: this.state.portfolioCode
            }
        });

        this.handleButtonClick('JoinPortTrigger',false)
        this.handleButtonClick('portfolioCode',null)}

    catch (error){
        alert(error.response.data.message)
        }

        this.getPortfolios();
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
            this.getAllPublicPortfolios()
        }

        catch(error){
            alert(error.response.data.message)
        }
    }

    async getPortfolios(){
        try {
            const requestUrl = 'users/' + this.state.user.id;
            const response = await api.get(requestUrl, {});

            console.log(response.data);

            const tempPorts = response.data.collaboratingPortfolios;
            const tempPorts2 = response.data.ownedPortfolios;
            const tempPorts3 = tempPorts.concat(tempPorts2)

            this.setState({portfolios: tempPorts3});
        }

        catch(error){
            alert(error.response.data.message)
        }
    }

    async getAllPublicPortfolios(){
        try {

            const response = await api.get(`/portfolios/`, {
                headers: {
                    token: this.state.user.token,
                    sort: "weekly"
                }
            });

            this.setState({allPublicPorts: response.data });
        }

        catch(error){
            alert(error.response.data.message)
        }
    }
}


export default withRouter(Dashboard);