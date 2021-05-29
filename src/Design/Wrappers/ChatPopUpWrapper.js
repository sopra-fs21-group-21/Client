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
  top: 25%;
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
  height:40vh;
  background: rgb(29,26,26);
  border: none;
  border-radius: 20px;
`;

class ChatPopUpWrapper extends React.Component{

    constructor(props){
        super(props);
        this.stopInterval = this.stopInterval.bind(this)

    }

    stopInterval(){
        const myInterval = localStorage.getItem('myInterval')
        console.log(myInterval)
        if (myInterval)
        clearInterval(parseInt(localStorage.getItem('myInterval')));
    }

    render() {
        return (
            this.props.trigger ? (
                <Popup> <PopUpBaseContainer>
                    <XWrapper onClick={() =>
                    {this.props.setTrigger("ChatTrigger",false)
                        clearInterval(parseInt(localStorage.getItem('myInterval')))}

                    }>
                        <XSvg/>
                    </XWrapper>
                    <SecondaryContainer>
                        {this.props.children}
                    </SecondaryContainer>
                </PopUpBaseContainer></Popup>
            ) : ''
        );
    }
}

export default withRouter(ChatPopUpWrapper);