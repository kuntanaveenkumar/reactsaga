import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { getVehicles,updateStatus } from './vehicleAction';
import { NavLink, withRouter } from 'react-router-dom';
import LoadMakes from "../common/components/LoadMakes";
import LoadModels from "../common/components/LoadModels";
import LoadYears from "../common/components/LoadYears";
import Pagination from "react-js-pagination";
import { ListMakes } from '../../components/common/actions/loadmakesAction';
import { ListModels } from '../../components/common/actions/loadmodelsAction';
import { ListYears } from '../../components/common/actions/loadyearAction';
import "bootstrap/less/bootstrap";
import { Translate } from 'react-localize-redux';
const renderSelectField = ({ input, label, value, meta: { touched, error }, children }) => (
    <div>    
        <select {...input} className='form-control' value={input.value.value}>
          {children}
        </select>
        {touched && ((error && <span  className='error'>{error}</span>))}     
    </div>
  )
class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = { activePage: 1,make:'',model:'',year:'',sortby:'',sorttype:'',makeName:'asc',modelName:'asc',itemsCountPerPage:15 }
        this.FilterVehicles = this.FilterVehicles.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        //this.changeStatus=this.changeStatus.bind(this);        
        //store.dispatch(clearVehicles());
        /**************Multiple methods to dispatch an action********************/
        //1st method
        store.dispatch(getVehicles(this.state));
        store.dispatch(ListMakes());
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        store.dispatch(getVehicles({ ...this.state, activePage: pageNumber }));
        this.forceUpdate();
    }    
    sortVehicles = ({ target: { value, name } }) =>
    {
        let sorttype;      
        if(value=="asc")        
        {           
           sorttype="desc";
        }
        else
        {            
           sorttype="asc";
        }
        if(name=='makeName')
        this.setState({ makeName: sorttype});
        else if(name=='modelName')
        this.setState({ modelName: sorttype});
        this.setState({ sortby: name,sorttype:sorttype });
        store.dispatch(getVehicles({ ...this.state}));
    }
    /*changeStatus(event)
    {    
        store.dispatch(updateStatus(...this.state,event.target.value));
        event.preventDefault();
    }*/
    onChangeInput({ target: { value, name } }) 
    {        
       this.setState({ [name]: value, });        
       if (name == "make") {
            if (value) {
                store.dispatch(ListModels(value));
            }
        }
        if (name == "model") {
            if (value) {
                store.dispatch(ListYears(this.state.make, value));
            }
        }
    }
    FilterVehicles() {
        this.handlePageChange(1);
    }
    render() 
    {
        const divStyle = {           
           float:'right',
           width:'100%'
          };
          const divStyleRight = 
          {            
            float:'right'           
          };
        return <form className="form-signin" id="Vehicle" name="Vehicle">
        <div className="mainpanel">
            <div className="panelheader">
                <div className="panel panel-primary">
                    <div className="panel-heading" >
                        <div className="subheading" style={divStyle}><span className="fa fa-car" aria-hidden="true" id="logIcon" ></span><Translate id="vehicles_list">Vehicles List</Translate><span id="total">({this.props.total})</span>
                            <div style={divStyleRight}> <NavLink to={'/addvehicle'} className='btn btn-info btn-sm'>Add</NavLink > </div>
                        </div>
                    </div>
                    <div id="error"></div>
                    <table className="table"><thead><tr><th scope="col">
                    <button type="button" onClick={this.sortVehicles} name="makeName" value={this.state.makeName} style={{'fontWeight':'bold','fontSize':'12px','color':'#fff','padding':'0px','textDecoration':'underline'}} className="btn btn-link">
                    Make
                    </button>
                    </th><th scope="col">
                    <button type="button" onClick={this.sortVehicles} name="modelName" value={this.state.modelName}  style={{'fontWeight':'bold','fontSize':'12px','color':'#fff','padding':'0px','textDecoration':'underline'}} className="btn btn-link">
                    Model
                    </button>
                    </th><th scope="col">Year</th><th scope="col">Trim</th><th scope="col">Mileage</th><th scope="col">Antenna Name</th><th scope="col">AntennaUUID</th><th scope="col">AntennaMAC</th><th scope="col">Vin</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody>
                    <tr id="searchlist">
                        <th scope="col">
                        <LoadMakes listmakes={this.props.listmakes.listmakes} onChangeInput={this.onChangeInput} renderSelectField={renderSelectField} form="Vehicle" value={this.state.make}/>
                        
                        </th>
                        <th scope="col">
                            <LoadModels listmodels={this.props.listmodels.listmodels} onChangeInput={this.onChangeInput} renderSelectField={renderSelectField} form="Vehicle"  value={this.state.model}/>
                        </th>
                        <th scope="col">
                            <LoadYears listyears={this.props.listyears.listyears} onChangeInput={this.onChangeInput} renderSelectField={renderSelectField} form="Vehicle" value={this.state.year} />
                        </th> 
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">
                            <input type="text" name="antennaUUID" id="antennaUUID" placeholder="Search By Antenna UUID" value={this.state.antennaUUID} onChange={this.onChangeInput} /></th>
                        <th scope="col"><input type="text" name="antennaMAC" id="antennaMAC" placeholder="Search By Antenna MAC" onChange={this.onChangeInput} /></th>
                        <th scope="col"> <input type="text" name="vin" id="vin" placeholder="Search By Vin" onChange={this.onChangeInput} /></th>
                        <th scope="col"></th>
                        <th scope="col"><input type="button" name="filter" id="filter" value="Filter" className="btn btn-primary btn-xs" onClick={this.FilterVehicles} /></th>
                    </tr>  
                        {this.props.vehicles && this.props.vehicles.map(vehicle =>
                            <tr key={vehicle.vehicleId}>                                
                                <td>{vehicle.makeName} </td>
                                <td>{vehicle.modelName} </td>
                                <td>{vehicle.yearName} </td>
                                <td>{vehicle.vtrim} </td>
                                <td>{vehicle.mileage} </td>
                                <td>{vehicle.antennaName} </td>
                                <td>{vehicle.antennaUUID} </td>
                                <td>{vehicle.antennaMAC} </td>
                                <td>{vehicle.vin} </td>
                                <td className="premium">
                                {
                                        vehicle.status ? "Active" : "InActive"
                                }                                  
                                </td>
                                <td>
                                    <NavLink className="btn btn-primary btn-sm" to={'/addvehicle/' + vehicle.vehicleId}>Edit</NavLink>                                  
                                </td>
                            </tr>)}
                        <tr>
                            <td colSpan="10" style={{'textAlign':'center'}}>
                                <Pagination activePage={this.state.activePage} itemsCountPerPage={this.state.itemsCountPerPage} totalItemsCount={this.props.total} pageRangeDisplayed={15} onChange={this.handlePageChange} />
                            </td></tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </form>;
    }
}
const mapStateToProps = (state) => {    
    return {
        vehicles: state.vehicles ? state.vehicles["vehicles_list"] : "",
        listmakes: state.listmakes,
        listmodels: state.listmodels,     
        listyears: state.listyears,   
        total: state.vehicles ? state.vehicles["total"] : "",
    }
}
export default withRouter(connect(
    mapStateToProps,
)(Vehicles))