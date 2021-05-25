import React from "react";
import styled from "styled-components";
import {Button} from "../Design/Button";

const PositionContainer = styled.div`
  margin: 3px 5px 3px 5px;
  width: 90%;
  padding: 5px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border: none;
  outline: none;
`

const InfoTag = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: white;
  margin-left: 3px;
  margin-right: 3px;
`

const InfoTagContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const ButtonContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const ClosePositionButton = styled(Button)`
  background-color: rgba(255,101,80,0.89);
  &:hover {
    background-color: rgba(255,101,80,0.99);
    box-shadow: 1px 1px 3px 2px rgba(255, 173, 0, 0.3);
    cursor: pointer;
  }
`

const PositionOverview = (props) => {
    return(
        <PositionContainer>
            <InfoTagContainer>
                <InfoTag>Code: {props.position.code} </InfoTag>
                <InfoTag>Amount: {props.position.amount} </InfoTag>
                <InfoTag>Type: {props.position.type} </InfoTag>
                <InfoTag>Value: {props.position.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF </InfoTag>
                <InfoTag>Current price: {props.position.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CHF </InfoTag>


            </InfoTagContainer>
            <ButtonContainer>
                <ClosePositionButton onClick = {() => {
                    props.setTrigger('ClosePositionTrigger',true)
                    props.setTrigger('closePositionId',props.position.id)
                }}
                disabled = {!props.allowChanges}
                >
                    Close
                </ClosePositionButton>
            </ButtonContainer>
        </PositionContainer>
    );
};

export default PositionOverview;