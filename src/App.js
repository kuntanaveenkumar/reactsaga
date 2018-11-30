import React, { Component } from 'react';
import { Switch,BrowserRouter, Route} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import LoginLayout from "./components/layouts/LoginLayout";
import { LocalizeProvider } from "react-localize-redux";
class App extends Component {
  render() {
    return (    
      <LocalizeProvider>
      <BrowserRouter>
      <Switch>      	     
		    <Route exact path="/" component={LoginLayout}/>
        <Route exact path="/index" component={LoginLayout}/>
		    <Route exact path="/login" component={LoginLayout}/>  
        <Route exact path="*" component={MainLayout}/> 
      </Switch>
      </BrowserRouter>      
      </LocalizeProvider> 
    );
  }
}
export default App;
