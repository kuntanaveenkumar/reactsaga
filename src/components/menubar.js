import React, { Component } from "react";
import { Link } from  "react-router-dom";
import { Redirect } from 'react-router'
import store from "../store/store";
import { logoutRequest } from './common/actions/logoutAction';
import { Button } from 'reactstrap';
//import LocaleProvider from './context/LocaleContext';
//import Greeting from './Greeting';
//import ToggleLocale from './ToggleLocale';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from 'react-localize-redux';
import globalTranslations from "../translations/global.json";
class MenuBar extends Component
{    
    constructor(props)
    {
        super(props);
        this.state = {
            redirect: false
          }
        this.Logout=this.Logout.bind(this);
        props.initialize({
            languages: [
              { name: 'en', code: 'en' }, 
              { name: 'fr', code: 'fr' }
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup }
      });
        
    }
    Logout()
    {               
      //  const { history } = this.props;
     //  store.dispatch(logoutRequest(history));
        localStorage.removeItem('token');
        location.href = '/login';
        this.setState({ redirect: true });
    }
	render()
	{

        const divStyle = {
            textAlign: 'right',
           float:'right',
           width:'100%'
          };

        const { redirect } = this.state;

        if (redirect) {
        return <Redirect to='/login'/>;
        }
		return <nav className="navbar navbar-expand-lg navbar-light bg-blue">
        <div>        
         
        <Button  color="primary" id="sidebarCollapse" className="btn btn-info-white" onClick={this.props.onClickSidebarCollapse}>  <i className="fas fa-align-left"></i></Button>
        </div>
         <div style={divStyle}>  
            <Button  color="primary" id="sidebarCollapse" className="btn btn-primary btn-sm navbar-btn pull-right" onClick={this.Logout}>&nbsp;&nbsp;Logout</Button>
         </div>
    </nav> ;
	}
}
export default withLocalize(MenuBar)