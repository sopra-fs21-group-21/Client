import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import XSvg from "../../Design/SVGs/XSvg";
import {Popup} from "./PopUp";

const PopUpBaseContainer = styled.div`
  min-width: 30vw;
  min-height: 60%;
  background-color: rgba(211,211,211,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  position: absolute;
  padding: 1%;
  right: 34%;
  top: 18%;
`
const XWrapper = styled.div`
  top: 2vh;
  left: 2vh;
  width:100%;
  position: absolute;
  margin-bottom: 2%;
  align-items: center;
`;

const SecondaryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width:100%;
  height:22vh;
  background: rgb(29,26,26);
  border: none;
  border-radius: 20px;
`;

class ForgotPwdWrapper extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            this.props.trigger ? (
                <Popup> <PopUpBaseContainer>
                    <XWrapper onClick={() =>
                        this.props.setTrigger("forgotPwdTrigger",false)
                    }>
                        <XSvg/>
                    </XWrapper>
                    <SecondaryContainer>
                        {this.props.children}
                    </SecondaryContainer>
                </PopUpBaseContainer></Popup>
            ) : ""
        );
    }
}

export default withRouter(ForgotPwdWrapper);