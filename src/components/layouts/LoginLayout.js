import React, { Component } from 'react';
import {Link,Route,Switch} from 'react-router';
import Login from "../login";

class LoginLayout extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
            <Route path="/" component={Login} />
            <Route path="/index" component={Login} />
        </Switch>
      </div>
    );
  }
}
export default LoginLayout;