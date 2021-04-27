import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import XSvg from "../../Design/SVGs/XSvg";

const PopUpBaseContainer = styled.div`
  min-width: 25vw;
  min-height: 22vh;
  background-color: rgba(211,211,211,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  position: absolute;
  padding: 1%;
  right: 21.65%;
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
  height:19vh;
  background: rgb(29,26,26);
  border: none;
  border-radius: 20px;
`;

class OpenPositionWrapper extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            this.props.trigger ? (
                <PopUpBaseContainer>
                    <XWrapper onClick={() =>
                        this.props.setTrigger("OpenPositionTrigger",false)
                    }>
                        <XSvg/>
                    </XWrapper>
                    <SecondaryContainer>
                        {this.props.children}
                    </SecondaryContainer>
                </PopUpBaseContainer>
            ) : ""
        );
    }
}

export default withRouter(OpenPositionWrapper);