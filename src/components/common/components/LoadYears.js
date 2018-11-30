import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
class LoadYears extends Component 
{    
    constructor(props) 
    {
        super(props);
        this.state={"listyears": []}    
    }     
    handleLangChange = (value) => {             
        this.props.onChangeInput(value);            
    }
    render() 
    {                   
        return (<Field name="years" component={this.props.renderSelectField} id="years" className="form-control" value={this.props.value} onChange={this.handleLangChange} form={this.props.form}>
                       <option value="">Select</option>     
                            {                                        
                              this.props.listyears && this.props.listyears.map(function (year) {
                                  return <option key={year.vehicleid + year.year} value={year.vehicleid}>{year.year} {year.trim}</option>;
                             })}                                      
                </Field>
                )
    }
}
LoadYears = reduxForm({
    form: '' 
  })(LoadYears)
export default LoadYears;