import React from 'react';
import { withRouter } from 'react-router-dom';
import {Popup} from "../../views/PopUps/Popup";
import {PopupInner} from "../../views/PopUps/PopupInner";
import XSvg from "../../views/SVGS/XSvg";
import {RedXWrapper} from "../../views/SVGS/RedXWrapper";

class NewUserName extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return   (

            this.props.trigger ?(
                <Popup>
                    <PopupInner>
                        <RedXWrapper onClick={() => this.props.setTrigger("NewUserNameTrigger",false)}>
                            <XSvg/>
                        </RedXWrapper>
                        {this.props.children}
                    </PopupInner>
                </Popup>) : ""

        );
    }
}

export default withRouter(NewUserName);