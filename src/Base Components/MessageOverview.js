import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  margin: 3px 5px 3px 5px;
  width: 80%;
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
  font-size: 11px;
  color: black;
  margin-left: 3px;
  margin-right: 3px;
`

const MessageOverview = ({message}) => {
    return(
        <MessageContainer>
            <InfoTag>{message.sentAt}</InfoTag>
            <InfoTag>{message.sender}</InfoTag>
            <InfoTag>: {message.content} </InfoTag>
        </MessageContainer>
    );
};

export default MessageOverview;