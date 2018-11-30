import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Translate } from 'react-localize-redux';
class LeftBar extends Component {
    constructor(props) {
        super(props);
        this.state = { isDealOpen: false,isClientOpen:false,isRecallOpen:false,isServiceOpen:false };
        this.toggleOpen = this.toggleOpen.bind(this);
    }
    toggleOpen(e,param) {     
        if(param=='isDealOpen')
        this.setState({ isDealOpen: !this.state.isDealOpen,isClientOpen:false,isRecallOpen:false,isServiceOpen:false });
        else if(param=='isClientOpen')
        this.setState({ isClientOpen: !this.state.isClientOpen, isDealOpen: false,isRecallOpen:false,isServiceOpen:false });
        else if(param=='isRecallOpen')
        this.setState({ isRecallOpen: !this.state.isRecallOpen, isDealOpen: false,isClientOpen:false,isServiceOpen:false });
        else if(param=='isServiceOpen')
        this.setState({ isServiceOpen: !this.state.isServiceOpen, isDealOpen: false,isRecallOpen:false,isClientOpen:false });
    }
    render() {
        const divStyle = {
            height: '8%'
        };
        //const menuClass = 'collapse list-unstyled'{this.state.isOpen ? " show" : ""};
        const isDealOpen = `collapse list-unstyled ${this.state.isDealOpen ? " show" : ""}`;
        const isClientOpen = `collapse list-unstyled ${this.state.isClientOpen ? " show" : ""}`;
        const isRecallOpen = `collapse list-unstyled ${this.state.isRecallOpen ? " show" : ""}`;
        const isServiceOpen = `collapse list-unstyled ${this.state.isServiceOpen ? " show" : ""}`;
        return <nav id="sidebar" className={this.props.condition ? "active" : ""}>
            <div className="sidebar-header" style={divStyle}>
                <img alt="" src={require('../images/logo_print.png')} id="dealerimage" />
            </div>
            <ul className="list-unstyled components">
                <li>
                    <Link to='/home'><i className='fa fa-home'></i> <Translate id="home">Home</Translate></Link>
                </li>
                <li className="active" onClick={(e) => {this.toggleOpen(e, 'isDealOpen')}}>
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded={this.state.isDealOpen ? "true" : "false"} className="dropdown-toggle"><i className="fa fa-handshake"></i>&nbsp;&nbsp;<Translate id="deals_manager">Deals Manager</Translate></a>
                    <ul className={isDealOpen} id="homeSubmenu">
                        <li id='deals'><Link to='/deals'><i className='fa fa-caret-right'></i> <Translate id="deals">Deals</Translate></Link></li>
                    </ul>
                </li>
                <li onClick={(e) => {this.toggleOpen(e, 'isClientOpen')}}>
                    <a href="#clientSubmenu" data-toggle="collapse" aria-expanded={this.props.isClientOpen ? "true" : "false"} className="dropdown-toggle"><i className="fa fa-user"></i>&nbsp;&nbsp;<Translate id="client_manager">Client Manager</Translate></a>
                    <ul className={isClientOpen} id="clientSubmenu">
                        <li id='deals'><Link to='/clients'><i className='fa fa-caret-right'></i> <Translate id="clients">Clients</Translate></Link></li>
                        <li id='vehicles'><Link to='/vehicles'><i className='fa fa-caret-right'></i> <Translate id="vehicles">Vehicles</Translate></Link></li>
                    </ul>
                </li>
                <li onClick={(e) => {this.toggleOpen(e, 'isRecallOpen')}}>
                    <a href="#recallSubmenu" data-toggle="collapse" aria-expanded={this.props.isRecallOpen ? "true" : "false"} className="dropdown-toggle">
                        <i className="fa fa-user"></i>&nbsp;&nbsp;<Translate id="recall_manager">Recall Manager</Translate></a>
                    <ul className={isRecallOpen} id="recallSubmenu">
                        <li id='deals'><Link to='/recalls'><i className='fa fa-caret-right'></i> <Translate id="recalls">Recalls</Translate></Link></li>
                    </ul>
                </li>
                <li  onClick={(e) => {this.toggleOpen(e, 'isServiceOpen')}}>
                    <a href="#serviceSubmenu" data-toggle="collapse" aria-expanded={this.props.isServiceOpen ? "true" : "false"} className="dropdown-toggle"><i className="fa fa-cog"></i>&nbsp;&nbsp;<Translate id="service_manager">Service Manager</Translate></a>
                    <ul className={isServiceOpen} id="serviceSubmenu">
                        <li id='deals'><a href='#'><i className='fa fa-caret-right'></i> <Translate id="services">Services</Translate></a></li>
                    </ul>
                </li>
            </ul>
        </nav>;
    }
}
export default LeftBar