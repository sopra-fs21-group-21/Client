import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import ArrowUpSvg from "../../Design/SVGs/ArrowUpSvg";


const PopUpBaseContainer = styled.div`
    min-width: 5vw;
    min-height: 20vh;
    background-color: rgba(139,0,0,0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: none;
    border-radius: 20px;
    position:absolute;
    padding: 32px;
    top: 10%;
`
const ArrowUpWrapper = styled.div`
  width:10%;
  position: absolute;
  top: 0;
  margin-top: 8%;
`;

class MenuPopUpWrapper extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            this.props.trigger ? (
                <PopUpBaseContainer>
                    {this.props.children}
                    <ArrowUpWrapper onClick={() =>
                        this.props.setTrigger("DropDownTrigger",false)
                    }>
                        <ArrowUpSvg/>
                    </ArrowUpWrapper>
                </PopUpBaseContainer>
            ) : ""
        );
    }
}

export default withRouter(MenuPopUpWrapper);