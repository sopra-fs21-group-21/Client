import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

const MenuBox = styled.svg`
  viewBox: 0 0 100 80;
  width: 60px;
  height: 40px;
  margin-top: 50%;
`

const BlackBar = styled.rect`
  width: 50px;
  height: 10px;
`

class MenuItem extends React.Component {
    render() {
        return (<div>
                    <MenuBox>
                        <BlackBar/>
                        <BlackBar y = "15"/>
                        <BlackBar y = "30"/>
                    </MenuBox>
                </div>
        );
    }
}

export default withRouter(MenuItem);