import React from "react";
import styled from "styled-components";
import GreenBall from "../Design/SVGs/GreenBall.js"
import RedBall from "../Design/SVGs/RedBall.js"

const TraderContainer = styled.div`
  margin: 3px 5px 3px 5px;
  width: 90%;
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
  font-size: 16px;
  color: white;
  margin-left: 3px;
  margin-right: 3px;
  width: 50%;
`

const PictureTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 50%;
`

const TraderOverview = ({trader}) => {
    return(
        trader.status === 'online' ? (
            <TraderContainer>
                <InfoTag>{trader.username}</InfoTag>
                <PictureTag>
                    <GreenBall/>
                </PictureTag>
            </TraderContainer>) :
            (<TraderContainer>
                <InfoTag>{trader.username}</InfoTag>
                <PictureTag>
                    <RedBall/>
                </PictureTag>
            </TraderContainer>)
    );
};

export default TraderOverview;