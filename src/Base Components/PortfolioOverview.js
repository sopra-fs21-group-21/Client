import React from "react";
import styled from "styled-components";

const PortfolioContainer = styled.div`
  margin: 3px 5px 3px 5px;
  width: 80%;
  padding: 5px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: none;
  outline: none;
`

const InfoTag = styled.div`
  font-weight: 400;
  font-size: 11px;
  color: black;
  margin-left: 3px;
  margin-right: 3px;
`

const PortfolioOverview = ({portfolio}) => {
    return(
        <PortfolioContainer>
            <InfoTag>ID: {portfolio.id} </InfoTag>
            <InfoTag>Name: {portfolio.name} </InfoTag>
            <InfoTag>Balance: {portfolio.balance} </InfoTag>
            <InfoTag>Performance: {portfolio.performance} </InfoTag>
        </PortfolioContainer>
    );
};

export default PortfolioOverview;