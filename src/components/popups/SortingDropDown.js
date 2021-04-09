import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';



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
                    <div style={{width:'10%',position:'absolute', bottom:'0'}} onClick={() => this.props.setTrigger("SortingDropDownTrigger",false)}>
                        <img  width="32" alt="Ic keyboard arrow up 48px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ic_keyboard_arrow_up_48px.svg/32px-Ic_keyboard_arrow_up_48px.svg.png"/>
                    </div>

                    {this.props.children}
                </PopupInner>
            ) : ""

        );
    }
}

export default withRouter(SortingDropDown);
