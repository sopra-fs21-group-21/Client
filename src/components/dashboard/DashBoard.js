import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';

import JoinPortfolio from "../popups/JoinPortfolio";
import CreatePortfolio from "../popups/CreatePortfolio";


export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  width: 50%;
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(255, 173, 78);
  transition: all 0.3s ease;
  margin-top: 10px;
`;
const FormContainer = styled.div`
  background: rgb(241,117,117);
  margin-top: 2em;
  display: flex;

  flex-direction: column;
  align-items: center;
  min-height: 400px;
  justify-content: center;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  width:100%;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgb(246, 240, 240);
  color: rgb(29, 26, 26);
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 800px;
  height:700px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 80px;
  background: rgb(29, 26, 26);
  align-items:center;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const PortLeadCont = styled.div`
  position: relative;
  min-height: 300px;
  height: auto;
  width:90%;
  padding-left: 15px;
  border: none;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  background: rgb(246, 240, 240);
  color: rgb(29, 26, 26);
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;



const Container = styled.div`
  width:100%;
  margin-top: 2em;

  min-height: 400px;
  justify-content: center;
`;

const InnerPopContainer = styled.div`
  display: flex;
  flex-direction: column;
    justify-content: center;
    align-items:center;

  width:448px;
  height:250px;
  background: rgb(29,26,26);
  border: none;
  border-radius: 20px;
  
`;






const ButtonContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 200px;
  position: absolute;
  bottom: 10px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class DashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CreatePortTrigger: false,
            JoinPortTrigger: true
        };

        this.handleButtonClick=this.handleButtonClick.bind(this);
    }
    componentDidMount() {}

    handleButtonClick(key,bool) {
        this.setState({ [key]: bool });
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Container>
                        <Label  >Portfolio</Label>
                        <PortLeadCont >
                            <ButtonContainer>

                                <Button onClick={() => {

                                    this.handleButtonClick('CreatePortTrigger',true);
                                }}> + CREATE NEW</Button>


                                <Button onClick={() => {
                                    this.handleButtonClick('JoinPortTrigger',true);
                                }}>JOIN PORTFOLIO</Button>

                            </ButtonContainer>
                        </PortLeadCont>
                        </Container>


                        <Container>
                            <Label>Leaderboard</Label>

                            <PortLeadCont>
                            </PortLeadCont>
                        </Container>




                        <CreatePortfolio trigger={this.state.CreatePortTrigger} setTrigger={this.handleButtonClick}>
                            <InnerPopContainer>
                                <Label style={{marginTop:'18px'}}>PORTFOLIO NAME</Label>
                                <InputField style={{width:'90%'}}/>
                                    <div style={{display:'flex', flexDirection: 'row',
                                                width:'100%', justifyContent:'center',
                                                marginBottom:"20px"}}>
                                        <Button style={{width:'40%'}}>PRIVATE</Button>
                                        <Button style={{width:'40%',marginLeft:'14px'}}>SHARED</Button>
                                    </div>
                                <Button>+ CREATE PORTFOLIO </Button>
                            </InnerPopContainer>


                        </CreatePortfolio>



                        <JoinPortfolio trigger={this.state.JoinPortTrigger} setTrigger={this.handleButtonClick}>
                            <InnerPopContainer>
                            <Label>Portfolio invite code</Label>
                            <InputField style={{width:'80%', marginTop:'12px'}}/>
                            <Button> JOIN PORTFOLIO</Button>
                            </InnerPopContainer>

                        </JoinPortfolio>



                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(DashBoard);
