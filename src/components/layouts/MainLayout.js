import React, { Component } from 'react';
import LeftBar from '../leftbar';
import {Link,Route,Switch} from "react-router";
import Home from "../home";
import Vehicles from "../vehicles/Vehicles";
import AddVehicle from "../vehicles/AddVehicle";
import MenuBar from "../menubar";

class MainLayout extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state={condition:false}
        this.onClickSidebarCollapse=this.onClickSidebarCollapse.bind(this);
        if(localStorage.getItem("token")==null) this.props.history.push('/index');  
    }
    onClickSidebarCollapse()
    {        
        this.setState( { condition : !this.state.condition } );            
    }
    render() 
    {        
        
       return (
        <div className="wrapper">                
                <LeftBar condition={this.state.condition}/>                
                    <div id="content" className={this.state.condition ? "active" :""}>   
                    <MenuBar onClickSidebarCollapse={this.onClickSidebarCollapse}/>        
                    <Switch>                        
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/vehicles" component={Vehicles}/>    
                        <Route exact path="/addVehicle" component={AddVehicle}/>                       
                        <Route exact path="/addvehicle/:id" component={AddVehicle}/> 
                    </Switch>                    
                </div>        
      </div>
            );
    }
}
export default MainLayout;