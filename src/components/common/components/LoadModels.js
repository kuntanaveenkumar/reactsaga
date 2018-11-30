import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
class LoadModels extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state={"listmodels": []}        
        
    }  
    handleLangChange = (value) => {             
        this.props.onChangeInput(value);            
    }
    render() 
    {                   
        return (<Field name="model" component={this.props.renderSelectField}  id="model" className="form-control"  onChange={this.handleLangChange} value={this.props.value}  form={this.props.form}>
                       <option value="">Select</option>     
                            {                                        
                              this.props.listmodels && this.props.listmodels.map(function (model) {
                                  return <option key={model.modelid + model.name} value={model.modelid}>{model.name}</option>;
                             })}                                      
                </Field>
                )
    }
}
LoadModels = reduxForm({
    form: '' 
  })(LoadModels)
export default LoadModels;