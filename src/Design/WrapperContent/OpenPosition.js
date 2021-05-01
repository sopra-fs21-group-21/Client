import React from "react";
import styled from "styled-components";
import {Label} from "../Label";
import {InputField} from "../InputField";
import {Button} from "../Button";
import { withRouter } from 'react-router-dom';

const StockCodeLabel = styled(Label)`
  
`

class OpenPosition extends React.Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    render(){
        return(
            <h1>Hello World</h1>
        );
    }
}

export default withRouter(OpenPosition);
