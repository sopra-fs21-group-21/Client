import React from "react";
import styled from "styled-components";
import {Label} from "../Label";
import {InputField} from "../InputField";
import {Button} from "../Button";
import { withRouter } from 'react-router-dom';
import {api} from "../../helpers/api";
import User from "../../models/User";

const OverheadLabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
`

const OverheadLabel = styled(Label)`
`

const AmountFieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 5%;
`

const AmountField = styled(InputField)`
    width:60%;
`

const AmountReturnedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
`

const AmountReturned = styled(Label)`
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -1.5%;
`

const ClosePositionButton = styled(Button)`
    padding: 1%;
    width: 50%;
`

const ClosePositionBaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 80%;
    width: 100%;
`

class ClosePosition extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            amount: 0
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    render(){
        return(
            <ClosePositionBaseContainer>
                <OverheadLabelContainer>
                    <OverheadLabel>amount of shares to close</OverheadLabel>
                </OverheadLabelContainer>
                <AmountFieldContainer>
                    <AmountField
                        onChange = { e => {this.handleInputChange('amount',e.target.value);
                        }}
                    />
                </AmountFieldContainer>
                <AmountReturnedContainer>
                    <AmountReturned>Realized Gain/Loss: </AmountReturned>
                </AmountReturnedContainer>
                <ButtonContainer>
                    <ClosePositionButton onClick = {()=>{
                        this.closePositions()
                        this.props.setTrigger('ClosePositionTrigger',false)
                    }}>Close Position</ClosePositionButton>
                </ButtonContainer>
            </ClosePositionBaseContainer>
        );
    }

    async closePositions(){
        const requestUrl = '/portfolios/' + this.props.portfolioId + '/' + this.props.positionId;
        const tempUser = new User(JSON.parse(localStorage.getItem('user')));

        await api.delete(requestUrl,{headers:{
                token: tempUser.token
        }});
    }
}

export default withRouter(ClosePosition);