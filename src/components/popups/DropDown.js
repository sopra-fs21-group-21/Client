import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {ArrowUpWrapper} from "../../views/SVGS/ArrowUpWrapper";
import ArrowUpSvg from "../../views/SVGS/ArrowUpSvg";


/** a Popupinner with different properties than the normal Popupinner, thats y  overwritten**/

const PopupInner = styled.div`
    padding:32px;
    width:200px;
    height:241px;
    background: rgb(227,227,227);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: none;
    border-radius: 20px;
    position:relative;

`;






class DropDown extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return   (

            this.props.trigger ?(

                        <PopupInner >
                            <ArrowUpWrapper onClick={() => this.props.setTrigger("DropDownTrigger",false)}>
                                <ArrowUpSvg/>
                            </ArrowUpWrapper>

                            {this.props.children}
                        </PopupInner>
                ) : ""

        );
    }
}

export default withRouter(DropDown);
