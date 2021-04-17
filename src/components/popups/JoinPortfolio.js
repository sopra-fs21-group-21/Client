import React from 'react';
import { withRouter } from 'react-router-dom';
import {Popup} from "../../views/PopUps/Popup";
import {PopupInner} from "../../views/PopUps/PopupInner";
import {RedXWrapper} from "../../views/SVGS/RedXWrapper";
import XSvg from "../../views/SVGS/XSvg";





class JoinPortfolio extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return   (

            this.props.trigger ?(
                    <Popup>
                        <PopupInner>

                            <RedXWrapper onClick={() => this.props.setTrigger("JoinPortTrigger",false)}>
                                <XSvg/>
                            </RedXWrapper>
                            {this.props.children}
                        </PopupInner>
                    </Popup>) : ""

        );
    }
}

export default withRouter(JoinPortfolio);
