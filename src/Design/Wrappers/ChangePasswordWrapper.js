import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import XSvg from "../../Design/SVGs/XSvg";
import {Popup} from "./PopUp";

const PopUpBaseContainer = styled.div`
  min-width: 35vw;
  min-height: 20vh;
  background-color: rgba(211,211,211,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  position: absolute;
  padding: 1%;
  top: 40%;
`
const XWrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
  min-height: 2vh;
  align-items: center;
  justify-content: flex-start;
`;

const SecondaryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width:100%;
  height:26vh;
  background: rgb(29,26,26);
  border: none;
  border-radius: 20px;
`;

class ChangePasswordWrapper extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            this.props.trigger ? (
                <Popup><PopUpBaseContainer>
                    <XWrapper onClick={() =>
                        this.props.setTrigger("PasswordTrigger",false)
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

export default withRouter(ChangePasswordWrapper);