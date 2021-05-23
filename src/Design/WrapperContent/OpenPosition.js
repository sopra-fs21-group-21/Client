import React from "react";
import styled from "styled-components";
import {Label} from "../Label";
import {InputField} from "../InputField";
import {Button} from "../Button";
import { withRouter } from 'react-router-dom';
import User from "../../models/User";
import {api} from "../../helpers/api";

const BaseContainer = styled.div`
    width:100%;
    height: 100%;
`

const StockCodeLabel = styled(Label)`
`

const StockCodeContainer = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
`

const CodeSearchContainer = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CodeSearchInput = styled(InputField)`
    width: 80%;
    height: 70%;
`

const SearchButtonContainer = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
`

const SearchButton = styled(Button)`
    width: 40%;
    height: 70%;
`

const StockInfoBaseContainer = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StockInfoMidContainer = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 6%;
    background-color: #5B4949;
    border-radius: 20px;
`

const StockInfoNameLabelContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15%;
    width:100%;
    margin-bottom: 5%;
`

const StockInfoNameLabel = styled(Label)`
`

const StockInfoLabel = styled(Label)`
    font-size: 12px;
    margin-left: 10%;
    text-transform: none;
    margin-bottom: 1%;
`

const SharesLabelContainer = styled.div`
    width: 100%;
    height: 6%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SharesLabel = styled(Label)`
`

const SharesInputFieldContainer = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SharesInputField = styled(InputField)`
    width: 80%;
    height: 70%;
`

const GeneralInformationContainer = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: 5%;
`

const GeneralInformationLabel = styled(Label)`
    font-size: 12px;
    margin-left: 10%;
    text-transform: none;
`

const LongShortButtonContainer = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-top: 3%;
`

const LongShortButton = styled(Button)`
    width: 30%;
    height: 50%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 4%;
`

const OpenButtonContainer = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2%;
    margin-bottom: 2%;
`

const OpenButton = styled(Button)`
    width: 40%;
    height: 50%;
`

class OpenPosition extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            stockName: 'Stock Info',
            dailyChange: '',
            lastDayClose: '',
            volume: '',
            priceAsOf: '',
            pricePerShare: 0,
            shareAmount: 0,
            stockSearch: '',
            stockType: null
        }
    }

    handleButtonClick(key, value) {
        this.setState({ [key]: value });
    }

    render(){
        return(
            <BaseContainer>

                <StockCodeContainer>
                    <StockCodeLabel>Stock Code</StockCodeLabel>
                </StockCodeContainer>

                <CodeSearchContainer>
                    <CodeSearchInput onChange={e => {
                        this.handleButtonClick('stockSearch', e.target.value);
                    }}/>
                </CodeSearchContainer>

                <SearchButtonContainer>
                    <SearchButton onClick={()=>{
                        this.search()
                    }}>Search</SearchButton>
                </SearchButtonContainer>

                <StockInfoBaseContainer>
                    <StockInfoMidContainer>
                        <StockInfoNameLabelContainer>
                            <StockInfoNameLabel>
                                {this.state.stockName}
                            </StockInfoNameLabel>
                        </StockInfoNameLabelContainer>
                        <StockInfoLabel>
                            Daily Change: {this.state.dailyChange}
                        </StockInfoLabel>
                        <StockInfoLabel>
                            Price at last close: {this.state.lastDayClose}
                        </StockInfoLabel>
                        <StockInfoLabel>
                            Volume: {this.state.volume}
                        </StockInfoLabel>
                    </StockInfoMidContainer>
                </StockInfoBaseContainer>

                <SharesLabelContainer>
                    <SharesLabel>How Many Shares:</SharesLabel>
                </SharesLabelContainer>

                <SharesInputFieldContainer>
                    <SharesInputField onChange={e => {
                        this.handleButtonClick('shareAmount', e.target.value);
                    }}/>
                </SharesInputFieldContainer>

                <GeneralInformationContainer>
                    <GeneralInformationLabel>Portfolio Balance: {this.props.portfolio.balance}</GeneralInformationLabel>
                    <GeneralInformationLabel>Price per Share: {this.state.pricePerShare} CHF</GeneralInformationLabel>
                    <GeneralInformationLabel>Total Price: {this.state.pricePerShare * this.state.shareAmount}</GeneralInformationLabel>
                </GeneralInformationContainer>

                <LongShortButtonContainer>
                    <LongShortButton onClick={()=>{
                      this.handleButtonClick('stockType','STOCK_LONG')
                    }}>Long</LongShortButton>

                    <LongShortButton onClick={()=>{
                        this.handleButtonClick('stockType','STOCK_SHORT')
                    }}>Short</LongShortButton>
                </LongShortButtonContainer>

                <OpenButtonContainer>
                    <OpenButton onClick = {()=>{
                        this.openPosition()
                        this.props.setTrigger('OpenPositionTrigger',false)
                    }}>Open</OpenButton>
                </OpenButtonContainer>

            </BaseContainer>
        );
    }

    async openPosition(){
        const tempUser = new User(JSON.parse(localStorage.getItem('user')));
        const requestUrl = 'portfolios/' + this.props.portfolio.id;
        const requestBody = {
            'code': this.state.stockSearch,
            'amount': this.state.shareAmount,
            'type': this.state.stockType
        }

        const response = await api.post(requestUrl,requestBody,{
            headers: {
                token: tempUser.token
            }
        });

        this.props.setTrigger('OpenPositionTrigger',false)

        console.log(response);

        this.props.reloadPortfolio(this.props.portfolio.id);
    }

    async search(){
        const tempUser = new User(JSON.parse(localStorage.getItem('user')));
        const requestUrl = 'positions/' + this.state.stockSearch + '/more';

        const response = await api.get(requestUrl, {
            headers: {
                token: tempUser.token
            }
        });

        console.log(response.data);

        this.setState({'pricePerShare': response.data.currentPrice});
        this.setState({'dailyChange': response.data.changeFromLastClose});
        this.setState({'lastDayClose': response.data.lastDayClose});
        this.setState({'volume': response.data.lastDayVolume});
    }
}

export default withRouter(OpenPosition);
