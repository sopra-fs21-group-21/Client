import React from "react";
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {InputField} from "../InputField";
import {Button} from "../Button";
import {api} from "../../helpers/api";
import ListContainer from "../ListContainer";
import ListElement from "../ListElement";
import User from "../../models/User";
import MessageOverview from "../../Base Components/MessageOverview";

const ChatBaseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const ChatDisplayContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MessageSendContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5%;
`

const MessageInputField = styled(InputField)`
  width: 60%;
  height: 40%;
  margin: 5%;
`

const MessageSendButton = styled(Button)`
  width: 20%;
  height: 40%;
  margin: 5%;
`

const Messages = styled.div`
  margin-top: 6%;
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 25px;
`

const MessageContainer = styled(ListContainer)`
`

const Message = styled(ListElement)`
`

class Chat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            message: '',
            messageList: []
        }
    }

    handleButtonClick(key, value) {
        this.setState({ [key]: value });
    }

    async sendMessage(){

        const tempUser = new User(JSON.parse(localStorage.getItem('user')));
        const requestUrl = '/portfolios/' + this.props.portfolio.id + '/chat'
        const requestBody = {
            'content': this.state.message
        }

        const response = await api.post(requestUrl,requestBody,{
            headers: {
                token: tempUser.token
            }
        });

        await this.refreshChat()
    }

    async refreshChat(){
        const requestUrl = '/portfolios/' + this.props.portfolio.id + '/chat'
        const tempUser = new User(JSON.parse(localStorage.getItem('user')));

        const response = await api.get(requestUrl, {
            headers: {
                token: tempUser.token
            }
        });

        this.setState({'messageList':response.data.messageList})

        console.log(this.state.messageList)
    }

    render(){
        return(
            <ChatBaseContainer>
                <ChatDisplayContainer>
                    <Messages>
                        <MessageContainer>
                            {this.state.messageList.map( message => {
                                return(
                                    <Message key={message.id}>
                                        <MessageOverview message={message}/>
                                    </Message>
                                );
                            })}
                        </MessageContainer>
                    </Messages>
                </ChatDisplayContainer>
                <MessageSendContainer>
                    <MessageInputField onChange={e => {
                        this.handleButtonClick('message', e.target.value)
                    }}/>
                    <MessageSendButton onClick = {()=> {
                        this.sendMessage()
                    }}>Send</MessageSendButton>
                </MessageSendContainer>
            </ChatBaseContainer>
        );
    }
}

export default withRouter(Chat);