import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";

// Components
import Home from "./home/Home";
import WorkSpace from "./workspace/WorkSpace";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PSForget from "./auth/PSForget";
import EmailConfirm from "./auth/EmailConfirm";
import ResetSent from "./auth/ResetSent";

// API Calls
import { init, signout} from './../Utils/APICalls';

class App extends Component {
  state = {
    init: true,
    loggedInUser: '',
    token: ''
  };

  componentDidMount() {
    init()
      .then(user => {
        this.handleLogin(user)
      })
      .catch(error => {
        this.setState({
          init: false
        })
      })
  };

  handleLogin = (user) => {
    this.setState({
      loggedInUser: user,
      init: false
    });
  }

  handleSignout = () => {
    signout()
      .then(user => {
        this.setState({
          loggedInUser: '',
          token: '',
        });
      })
      .catch(error => {
        this.setState({ errMessage: error })
      })
  }

  render(){
    return (
      <BrowserRouter>
        <div className="app-main">
        {(!this.state.loggedInUser)? 
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route 
              path="/login" 
              component={() => <Login login={this.handleLogin} />}  
            />
            <Route path="/Signup" component={Signup} />
            <Route path="/forget-password" component={PSForget} />
            <Route path="/email-confirmation" component={EmailConfirm} />
            <Route path="/reset-email-sent" component={ResetSent} />
          </Switch> 
        : <WorkSpace />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
