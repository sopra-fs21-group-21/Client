import React from "react";
import styled from "styled-components";
import {Label} from "../Label";
import {InputField} from "../InputField";
import {Button} from "../Button";
import { withRouter } from 'react-router-dom';

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
    margin-top: 5%;
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
            weeklyChange: '',
            yearToDate: '',
            priceAsOf: '',
            pricePerShare: 25,
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
                    <SearchButton>Search</SearchButton>
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
                            Weekly Change: {this.state.weeklyChange}
                        </StockInfoLabel>
                        <StockInfoLabel>
                            Year-To-Date: {this.state.yearToDate}
                        </StockInfoLabel>
                        <StockInfoLabel>
                            Price as of today: {this.state.priceAsOf}
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
                      this.handleButtonClick('stockType','Long')
                    }}>Long</LongShortButton>

                    <LongShortButton onClick={()=>{
                        this.handleButtonClick('stockType','Short')
                    }}>Short</LongShortButton>
                </LongShortButtonContainer>

                <OpenButtonContainer>
                    <OpenButton>Open</OpenButton>
                </OpenButtonContainer>

            </BaseContainer>
        );
    }
}

export default withRouter(OpenPosition);
