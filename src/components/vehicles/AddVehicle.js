import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LeftBar from '../leftbar';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import store from "../../store/store";
import { Form,Field, reduxForm,change } from 'redux-form';
import Client from "../common/Client";
import Select from 'react-select'
import { setVehicle } from './vehicleAction';
import {  actionCreators } from 'redux-form';
import LoadMakes from "../common/LoadMakes";
import LoadModels from "../common/LoadModels";
import LoadYears from "../common/LoadYears";
import {ListMakes} from "../common/actions/loadmakesAction";
import {ListModels} from "../common/actions/loadmodelsAction";
import {ListYears} from "../common/actions/loadyearsAction";
import {URL} from "../../constants/appConstants";
import { Translate } from 'react-localize-redux';
const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <label>{label}</label>
      <div>
        <select {...input} className='form-control'>
          {children}
        </select>
        {touched && ((error && <span  className='error'>{error}</span>))}
      </div>
    </div>
  )
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className='form-control'/>
        {touched && ((error && <span  className='error'>{error}</span>) || (warning && <span className='error'>{warning}</span>))}
      </div>
    </div>
  )
  
 class AddVehicle extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            vehicleId:'',
            make: '',
            model: '',
            years: '',
            vin: '',
            vehicleName: '',
            vehicleRegistrationNo: '',
            sclient_id: [],
            client_id: [],
            msg: '',
            data:'',
            isValidated: false,
            selectedClient:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.logChange = this.logChange.bind(this);    
        this.handleClientChange = this.handleClientChange.bind(this);    
        store.dispatch(ListMakes());    
    }  
    handleClientChange(selectedOption) 
    {           
        this.setState(state => {
            return {
                sclient_id: selectedOption
            };
          });
          let tclient_id=[];
          selectedOption.forEach(function(element) {
            tclient_id.push(element.value);
        });          
          this.setState(state => {
            return {
                client_id: tclient_id
            };
          });
    }
    componentDidUpdate(nextProps) 
    {
        if(this.state.model)
        {   
            store.dispatch(ListModels(this.state.make));          
        }
        if(this.state.years)
        {               
            store.dispatch(ListYears(this.state.make,this.state.model));          
        }
    }
    logChange({ target: { value, name } }) {
      
        this.setState({ [name]: value, });       
        if(name=="make")
        {           
            if(value)
            {                
                store.dispatch(ListModels(value));      
                    
            }
        }
        if(name=="model")
        {
            if(value)
            {
                store.dispatch(ListYears(this.state.make,value));                
            }
        }
    }    
    componentDidMount() {
          let self = this;       
        if(this.props.match.params.id!=undefined)
        {   
          
           this.setState({vehicleId:this.props.match.params.id});  
            
           return fetch(URL+'vehicles', {
            method: 'POST',
            headers: 
            {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
             },
             body: JSON.stringify({vehicle_id:this.props.match.params.id})
             }).then((response) => response.json())
             .then((responseJson) => 
             {
                 
                if(this.props.match.params.id!=undefined)
                {
                    let json = responseJson;
                    let client_id=[];
                    let x = json["result"]["clientlist"].map(function(k,v){               
                        client_id.push(k.client_id);
                        });
                    this.props.dispatch(change('AddVehicle', 'client_id', client_id));

                    self.setState({
                    make: json["result"]["vehicles_list"][0]["make"],
                    model: json["result"]["vehicles_list"][0]["model"],
                    years: json["result"]["vehicles_list"][0]["year"],
                    vin: json["result"]["vehicles_list"][0]["vin"],
                    vehicleName: json["result"]["vehicles_list"][0]['vehicleName'],
                    vehicleRegistrationNo: json["result"]["vehicles_list"][0]['vehicleRegistrationNo'],
                    client_id: client_id,
                    msg: '',
                    data:'1',
                    vehicleId:this.state.vehicleId
                    });             
                    this.props.dispatch(change('AddVehicle', 'make', json["result"]["vehicles_list"][0]["make"]));
                    this.props.dispatch(change('AddVehicle', 'model', json["result"]["vehicles_list"][0]["model"]));                    
                    this.props.dispatch(change('AddVehicle', 'years', json["result"]["vehicles_list"][0]["year"]));
                    this.props.dispatch(change('AddVehicle', 'vin', json["result"]["vehicles_list"][0]["vin"]));
                    this.props.dispatch(change('AddVehicle', 'vehicleName', json["result"]["vehicles_list"][0]["vehicleName"]));
                    this.props.dispatch(change('AddVehicle', 'vehicleRegistrationNo', json["result"]["vehicles_list"][0]["vehicleRegistrationNo"]));
                    //this.props.dispatch(change('AddVehicle', 'client_id', json["result"]["vehicles_list"][0]["clientId"]));
                  
                }
                return responseJson.success;
             })
             .catch((error) => {
             console.error(error);
             });
            
            }
    

    }      
    
    handleSubmit(event) {
        //event.preventDefault();
        //console.log(this.state);             
        let formData = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.years,
            vin: this.state.vin,
            vehicleName: this.state.vehicleName,
            vehicleRegistrationNo: this.state.vehicleRegistrationNo,
            client_id:this.state.client_id,
            vehicleId:this.state.vehicleId
        }
        
        return fetch(URL+'updatevehicle', {
            method: 'POST',
            headers: 
            {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
             },
             body: JSON.stringify(formData)
             }).then((response) => response.json())
             .then((responseJson) => 
             {
                this.setState({ years: responseJson["years"] });       
                this.props.history.push('/vehicles')
                 return responseJson.success;
             })
             .catch((error) => {
             console.error(error);
             });
    }
    render() {
        
        const { handleSubmit, valid, submitting,shandleSubmit } = this.props;
        if(this.props.match.params.id!=undefined)
        {            
            if (!this.state.data) {
                return <div />
            }
        }        
        return (<div className="mainpanel">
                    <div>
                        <div className="panelheader">
                            <div className="panel panel-primary" >
                                <div className="panel-heading">
                                    <span id="stype"><Translate id="edit_vehicle">Edit Vehicle</Translate></span>                                    
                                </div><div className="panel-body" style={{ height: '2000px', overflow: 'scroll' }}>

                                    <div className="col-md-12" >
                                        <Form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>                                    
                                            <div className="form-group" id="make">
                                                <label className="col-md-2 control-label">Make<span className="asterisk">*</span></label>
                                                <div className="col-md-9">                                                    
                                                    <LoadMakes listmakes={this.props.listmakes.listmakes} onChangeInput={this.logChange} value={this.state.make} form="AddVehicle" renderSelectField={renderSelectField}/>
                                                </div>
                                            </div>
                                            <div className="form-group" id="model">
                                                <label className="col-md-2 control-label">Model<span className="asterisk">*</span></label>
                                                <div className="col-md-9" >
                                                    <LoadModels  listmodels={this.props.listmodels.listmodels} onChangeInput={this.logChange}  value={this.state.model} form="AddVehicle" renderSelectField={renderSelectField}/>
                                                </div>
                                            </div>
                                            <div className="form-group" id="year">
                                                <label className="col-md-2 control-label">Year<span className="asterisk">*</span></label>
                                                <div className="col-md-9" >
                                                    <LoadYears  listyears={this.props.listyears.listyears} onChangeInput={this.logChange}  value={this.state.years} form="AddVehicle" renderSelectField={renderSelectField}/>
                                                </div>
                                            </div> 
                                            <div className="form-group" id="vinid">
                                                <label className="col-md-2 control-label">Vin No<span className="asterisk">*</span></label>
                                                <div className="col-md-9" >                                                    
                                                    <Field name="vin" type="text" placeholder="Vehicle Name..." className="form-control" 
                                                        component={renderField}                                                       
                                                        onChange={this.logChange} value={this.state.vin}                                                 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-2 control-label">Vehicle Name</label>
                                                <div className="col-md-9">                                                   
                                                    <Field name="vehicleName" type="text" placeholder="Vehicle Name..." className="form-control" 
                                                        component={renderField}                                                       
                                                        onChange={this.logChange} value={this.state.vehicleName}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-2 control-label">Vehicle Registration No</label>
                                                <div className="col-md-9">                                                   

                                                     <Field name="vehicleRegistrationNo" type="text" placeholder="Vehicle Registration No..." className="form-control" 
                                                        component={renderField}                                                         
                                                        onChange={this.logChange} value={this.state.vehicleRegistrationNo}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-2 control-label">Client </label>
                                                <div className="col-md-9">                                               
                                                <Client handleClientChange={this.handleClientChange} multiValue={this.state.client_id}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-md-2 control-label"></label>
                                                <div className="col-md-9">
                                                    <button className="btn btn-primary btn-sm" type="submit">Submit</button>&nbsp;&nbsp;
                                                    <Link className="btn btn-primary btn-sm"
                                                to={'/vehicles/'}>Cancel</Link>
                                                </div>
                                            </div>
                                        </Form></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
    }     
}
function validateInput(form) 
{
    const errors = {};     
    if (!form.make) {     
       errors.make = "Please Select Make";
    }
    if (!form.model) {
        errors.model = "Please Select Model";
    }
    if (!form.years) {
        errors.years = "Please Select Year";
    }
    if (!form.vin) {
      errors.vin = "Please enter vin no";
    }
    if (!form.vehicleName) {
        errors.vehicleName = "please enter vehicle name";
    } 
    if (!form.vehicleRegistrationNo) {
        errors.vehicleRegistrationNo = "please enter vehicle registration no";
    }       
    return errors;
}  
  const mapStateToProps = (state) => {
    return {
        vehicles:  state.vehicles,
        listmakes: state.listmakes,        
        listmodels: state.listmodels,
        listyears: state.listyears,
    }
}
/*export default AddVehicle = reduxForm({
    form: 'AddVehicle',validate: validateInput,mapStateToProps
  })(AddVehicle);*/

  // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
  AddVehicle = reduxForm({
    form: 'AddVehicle',validate: validateInput // a unique identifier for this form
  })(AddVehicle)

  // You have to connect() to any reducers that you wish to connect to yourself
  AddVehicle = connect(
    mapStateToProps,
    state => ({
      initialValues: {
        make: '',
        model: '',
        years: '',
        vin: '',
        vehicleName: '',
        vehicleRegistrationNo: '',
        client_id: '0',
        sclient_id:'0',
        msg: '',
        data:'',
        isValidated: false
    },
      enableReinitialize: true,
    }) // bind account loading action creator
  )(AddVehicle)
  
  export default AddVehicle;
