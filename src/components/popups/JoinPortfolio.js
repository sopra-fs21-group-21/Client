import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';

const Popup = styled.div`

    position:fixed;
    top:0;
    left:0;
    width:100%;
    height: 100vh;
    background-color : rgba(0,0,0,0.2);
    
    display:flex;
    justify-content: center;
    align-items: center;
    
    
`;
const PopupInner = styled.div`
    position:absolute;
    top:16px;
    right: 16px;
    
    padding:32px;
    width:500px;
    background: rgb(79,76,76);
    
    
    display: flex;
    flex-direction: column;
    justify-content: center;    
    
        border: none;
    border-radius: 20px;
    
    

`;



const Button = styled.button`
    position:absolute;
    top:16px;
    right: 16px;
`;



class JoinPortfolio extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return   (

            this.props.trigger ?(
                    <Popup>
                        <PopupInner>
                            <div style={{width:'10%'}} onClick={() => this.props.setTrigger("JoinPortTrigger",false)}>
                                <svg  style={{pointerEvents: 'auto', width:'50px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g transform="translate(-421.71-531.79)" fill="#da4453"><path d="m13.293 2l-11.293 11.293c0 0 .716.702.707.707l11.293-11.293" transform="translate(421.71 531.79)"/><path d="m424.42 533.79l11.293 11.293c0 0-.716.702-.707.707l-11.293-11.293z"/></g></svg>
                            </div>

                            {this.props.children}
                        </PopupInner>
                    </Popup>) : ""

        );
    }
}

export default withRouter(JoinPortfolio);
