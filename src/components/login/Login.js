import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  background: rgb(241,117,117);
  margin-top: 2em;
  display: flex;

  flex-direction: column;
  align-items: center;
  min-height: 400px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
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

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;


const ForgotPwdLabel = styled.div`
  color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const LoginLabel = styled.div`
  color: white;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 30px;

`;

const InputContainer = styled.div`
  width:50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const ButtonContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      name: null,
      username: null
    };
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = `/register`;
    this.props.history.push(path);
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        name: this.state.name
      });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
        <BaseContainer>
          <FormContainer>
            <Form>
              <InputContainer>
                <LoginLabel>LOGIN</LoginLabel>
                <Label>Username:</Label>
                <InputField
                    onChange={e => {
                      this.handleInputChange('username', e.target.value);
                    }}
                />
                <Label>Password:</Label>
                <InputField
                    onChange={e => {
                      this.handleInputChange('name', e.target.value);
                    }}
                />
              </InputContainer>
              <ForgotPwdLabel>FORGOT PASSWORD?</ForgotPwdLabel>
              <ButtonContainer>
                <Button
                    disabled={!this.state.username || !this.state.name}
                    onClick={() => {
                      this.login();
                    }}
                >
                  Login
                </Button >
                <Button onClick={this.routeChange}>
                  Create new Account
                </Button>
              </ButtonContainer>
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
export default withRouter(Login);
