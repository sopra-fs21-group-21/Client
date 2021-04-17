import React from 'react';
import { withRouter } from 'react-router-dom';
import {Popup} from "../../views/PopUps/Popup";
import {PopupInner} from "../../views/PopUps/PopupInner";
import {RedXWrapper} from "../../views/SVGS/RedXWrapper";
import XSvg from "../../views/SVGS/XSvg";



class CreatePortfolio extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return   (

            this.props.trigger ?(
                <Popup>
                    <PopupInner>
                        <RedXWrapper onClick={() => this.props.setTrigger("CreatePortTrigger",false)}>
                            <XSvg/>
                        </RedXWrapper>
                        {this.props.children}
                    </PopupInner>
                </Popup>) : ""

        );
    }
}

export default withRouter(CreatePortfolio);
