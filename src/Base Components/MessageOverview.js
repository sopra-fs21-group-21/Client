import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  margin: 3px 5px 3px 5px;
  margin-right: 9%;
  width: 100%;
  padding: 5px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  border: none;
  outline: none;
  background-color: #BDD863;
`

const InfoTag = styled.div`
  font-weight: 400;
  font-size: 11px;
  color: black;
  margin-left: 3px;
  margin-right: 3px;
`

const SentContainer = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const SenderContainer = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const ContentContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MessageOverview = ({message}) => {
    return(
        <MessageContainer>
            <SentContainer>
                <InfoTag>{message.sentAt}</InfoTag>
            </SentContainer>
            <SenderContainer>
                <InfoTag>{message.sender}:</InfoTag>
            </SenderContainer>
            <ContentContainer>
                <InfoTag>{message.content} </InfoTag>
            </ContentContainer>
        </MessageContainer>
    );
};

export default MessageOverview;