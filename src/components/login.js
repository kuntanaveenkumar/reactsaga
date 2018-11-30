import React, { Component } from 'react';
import Logo from "./logo";
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {loginRequest} from './common/actions/loginAction'
import store from "../store/store";
// Iterate over each error object and print them
// in an unordered list
const Errors = (props) => {  
  const { errors } = props
  return (
    <div>
      <ul>
        {errors.map(errors => (
          <li key={errors.time}>{errors.body}</li>
        ))}
      </ul>
    </div>
  )
}

class Login extends Component
{
	constructor(props) 
	{
		super(props);
		this.state = 
		{
			username: '',
			password: '',
			showError: false,
		};
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onShowLoginError = this.onShowLoginError.bind(this);		
	}
	onChangeInput({ target: { value, name } }) 
	{
		this.setState({[name]: value,});
		console.log(this.state) 
	}
	onShowLoginError() 
	{
		this.setState({showError: true,});
		console.log(this.state) 
	}
	onLogin(e) 
	{
		e.preventDefault();
		const { history } = this.props;
				store.dispatch(loginRequest({
					username: this.state.username,
					password: this.state.password,
					history
				  }))
	}
	render()
	{
		
		return <div id="content">
			<div className="row">
				<div className="block">
				<div className="col-md-12" >
                <div>
                    <div>                         
						 <Logo />
						 </div>
                    <div className="col-md-12">
                        <div >
                            { this.state.showError ? <div style={{ color: '#ef3933' }}>Your credentials are wrong</div> : '' }
							
                            <div className="row">
                                <div className="col-md-12">
                                    <form className="form-signin" id="signupLogin" name="signupLogin">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="username">Email address</label>										                                                 
												 <input type="email" className="form-control"  placeholder="Email" required   id="username" name="username" value={this.state.login} onChange={this.onChangeInput} ref={this.textInput} />
                                            </div>
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="password">Password</label>

                                                <input type="password" className="form-control" placeholder="Password" required  name="password" id="password" value={this.state.login} onChange={this.onChangeInput}/>
                                                <div className="emsgerror"></div>                                                
                                            </div>                           
                                            <div className="form-group">  
												<Button  color="primary" onClick={this.onLogin}>signin</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				</div>
        </div></div>
</div>         

	}
}

// Grab only the piece of state we need
const mapStateToProps = state => ({  
	login: state.login,
  })
  export default connect(mapStateToProps)(Login);