import React from "react";
import styled from "styled-components";
import {Label} from "../Label";
import {InputField} from "../InputField";
import {Button} from "../Button";
import { withRouter } from 'react-router-dom';
import User from "../../models/User";
import {api} from "../../helpers/api";
import PointsLoadingSpinner from "../PointsLoadingSpinner";

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
    font-size: 14px;
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
    font-size: 14px;
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
            stockSearch: null,
            stockType: null,
            // to keep track of the stockInfo
            gotShare: false,
            isLoading:false,
            shortClicked:false,
            longClicked:false,
            totalPrice: 0
        }
    }

    componentDidMount() {
        this.setState({'totalPrice': (this.state.pricePerShare * this.state.shareAmount)})

    }

    handleButtonClick(key, value) {
        this.setState({ [key]: value });
    }

    render(){
        return(
            <BaseContainer>

                {!this.state.gotShare ? <StockCodeContainer style={{marginTop:'20vh'}}>
                        <StockCodeLabel>Stock Code</StockCodeLabel>
                    </StockCodeContainer> :

                    <StockCodeContainer>
                    <StockCodeLabel>Stock Code</StockCodeLabel>
                </StockCodeContainer>}

                <CodeSearchContainer>
                    <CodeSearchInput onChange={e => {
                        this.handleButtonClick('stockSearch', e.target.value);
                    }}/>
                </CodeSearchContainer>

                <SearchButtonContainer>
                    <SearchButton onClick={()=>{
                        this.search()
                    }} disabled={!this.state.stockSearch}>{this.state.isLoading ? <PointsLoadingSpinner/>:<div>Search</div>}</SearchButton>
                </SearchButtonContainer>

                {!this.state.gotShare ? "" :
                <StockInfoBaseContainer>
                    <StockInfoMidContainer>
                        <StockInfoNameLabelContainer>
                            <StockInfoNameLabel>
                                {this.state.stockName}
                            </StockInfoNameLabel>
                        </StockInfoNameLabelContainer>
                        <StockInfoLabel>
                            Daily Change: {this.state.dailyChange>0 ? <p style={{color:'green' ,display:"inline"}}>{this.state.dailyChange}</p>:<p style={{color:'red',display:"inline"}}>{this.state.dailyChange}</p>}
                        </StockInfoLabel>
                        <StockInfoLabel>
                            Price at last close: {this.state.lastDayClose}
                        </StockInfoLabel>
                        <StockInfoLabel>
                            Volume: {this.state.volume}
                        </StockInfoLabel>
                    </StockInfoMidContainer>
                </StockInfoBaseContainer>}

                {!this.state.gotShare ? "" :
                    <SharesLabelContainer>
                    <SharesLabel>How Many Shares:</SharesLabel>
                </SharesLabelContainer>}

                {!this.state.gotShare ? "" :
                    <SharesInputFieldContainer>
                    <SharesInputField onChange={e => {
                        this.handleButtonClick('shareAmount', e.target.value);
                    }}/>
                </SharesInputFieldContainer>}

                {!this.state.gotShare ? "" :
                    <GeneralInformationContainer>
                    <GeneralInformationLabel>Portfolio Balance: {this.props.portfolio.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF</GeneralInformationLabel>
                    <GeneralInformationLabel>Price per Share: {this.state.pricePerShare.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF</GeneralInformationLabel>
                    <GeneralInformationLabel>Total Price:
                        {(this.state.pricePerShare* this.state.shareAmount > this.props.portfolio.balance ) ? <p style={{color:'red' ,display:"inline"}}>{(this.state.pricePerShare* this.state.shareAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF</p>:
                            <p style={{display:"inline"}}> {(this.state.pricePerShare* this.state.shareAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF</p>}
                       </GeneralInformationLabel>
                </GeneralInformationContainer>}

                {!this.state.gotShare ? "" :
                    <LongShortButtonContainer>
                    <LongShortButton style = {{ backgroundColor:this.getLongButtonStyleWhenClicked()}} onClick={()=>{
                      this.handleButtonClick('stockType','STOCK_LONG')
                      this.handleButtonClick('longClicked',true)
                      this.handleButtonClick('shortClicked',false)

                    }}>Long</LongShortButton>

                    <LongShortButton style={{backgroundColor: this.getShortButtonStyleWhenClicked()}} onClick={()=>{
                        this.handleButtonClick('stockType','STOCK_SHORT')
                        this.handleButtonClick('shortClicked',true)
                        this.handleButtonClick('longClicked',false)
                    }}>Short</LongShortButton>
                </LongShortButtonContainer>}

                {!this.state.gotShare ? "" :
                    <OpenButtonContainer>
                    <OpenButton onClick = {()=>{
                        this.openPosition()
                        this.props.setTrigger('OpenPositionTrigger',false)
                    }} disabled={!this.state.stockSearch || !(this.state.shareAmount > 0 ) || ((this.state.pricePerShare* this.state.shareAmount)>this.props.portfolio.balance)}>Open</OpenButton>
                </OpenButtonContainer>}

            </BaseContainer>
        );
    }

    getLongButtonStyleWhenClicked(){
        return this.state.longClicked ? 'rgba(255,255,255,0.8)' : 'rgba(255,173,78,0.8)'
    }
    getShortButtonStyleWhenClicked(){
        return this.state.shortClicked ? 'rgba(255,255,255,0.8)' : 'rgba(255,173,78,0.8)'
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

        this.setState({'isLoading':true})
        try{
            const response = await api.get(requestUrl, {
            headers: {
                token: tempUser.token
            }
        });
            console.log(response.data);
            this.setState({'gotShare' :true});
            this.setState({'pricePerShare': response.data.currentPrice});
            this.setState({'dailyChange': response.data.changeFromLastClose});
            this.setState({'lastDayClose': response.data.lastDayClose});
            this.setState({'volume': response.data.lastDayVolume});
        }
        catch (e) {
            this.setState({'isLoading':false})
                alert('Please use a valid stock code. You can find here most of the global stock codes : https://www.nasdaq.com/market-activity/stocks/screener')

        }
        this.setState({'isLoading':false})


    }


}

export default withRouter(OpenPosition);
