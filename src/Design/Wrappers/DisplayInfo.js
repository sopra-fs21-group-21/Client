import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import XSvg from "../../Design/SVGs/XSvg";
import {Popup} from "./PopUp";

const PopUpBaseContainer = styled.div`
  min-width: 35vw;
  min-height: 10vh;
  background-color: rgba(211,211,211,0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  position: absolute;
  padding: 1%;
  top: 60%;
  color:#D86969;
`

class DisplayInfoPopup extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            this.props.trigger ? (
                 <PopUpBaseContainer>
                        {this.props.text }
                </PopUpBaseContainer>
            ) : ""
        );
    }
}

export default withRouter(DisplayInfoPopup);