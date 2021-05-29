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
import FormContainer from "../FormContainer";

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
`

const MessageInputField = styled(InputField)`
  width:100%;
  height: 70%;
`



const MessageSendButton = styled(Button)`
  width: 30%;
  height: 40%;
  margin-top: 2%;
`

const Messages = styled.div`
  margin-top: 6%;
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 25px;
  overflow-y: scroll;
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
        this.handleSubmit=this.handleSubmit.bind(this);
        this.refreshChat=this.refreshChat.bind(this);
    }



    handleButtonClick(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount(){
        console.log(this.props.portfolio.id)
        const myInterval = setInterval(this.refreshChat, 1000);
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
    }


    handleSubmit(e){
        e.preventDefault();
        e.target.reset();
    }


    render(){
        return(
            <ChatBaseContainer>
                <ChatDisplayContainer>
                    <Messages>
                        <MessageContainer>
                            {this.state.messageList.map( message => {
                                return(
                                    <Message className='msg' key={message.id}>
                                        <MessageOverview message={message}/>
                                    </Message>
                                );
                            })}
                        </MessageContainer>
                    </Messages>
                </ChatDisplayContainer>
                <MessageSendContainer  >
                    <form style ={{  width: '60%',  height: '40%'


                    }} onSubmit={this.handleSubmit} ref="form">
                    <MessageInputField onChange={e => {
                        this.handleButtonClick('message', e.target.value)
                    }}/>
                    <MessageSendButton type="submit"  onClick = {()=> {
                        this.sendMessage()
                    }}>Send</MessageSendButton></form>
                </MessageSendContainer>
            </ChatBaseContainer>
        );
    }
}

export default withRouter(Chat);