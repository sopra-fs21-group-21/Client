import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import ArrowUpSvg from "../../views/SVGS/ArrowUpSvg";
import {ArrowUpWrapper} from "../../views/SVGS/ArrowUpWrapper";


/** a Popupinner with different properties than the normal Popupinner, thats y  overwritten**/

const PopupInner = styled.div`
    padding:32px;
    width:200px;
    height:210px;
    background: rgb(91,73,73);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: none;
    border-radius: 20px;
    position:absolute;
    margin-left: 490px;
    margin-top: 40px;
`;






class SortingDropDown extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return   (

            this.props.trigger ?(

                <PopupInner >
                    <ArrowUpWrapper onClick={() => this.props.setTrigger("SortingDropDownTrigger",false)}>
                        <ArrowUpSvg/>
                    </ArrowUpWrapper>

                    {this.props.children}
                </PopupInner>
            ) : ""

        );
    }
}

export default withRouter(SortingDropDown);
