
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Buttons,ProgressBar,Card, Row, Col } from 'react-bootstrap';
import {signin} from '../services/login_service';
import axios from 'axios';
import apiConfig from '../constants/apiurls'
import { Redirect, Route } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';




export class Reports extends Component {


    state = {
        columns: [{
            dataField: 'id',
            text: 'Transaction ID',
          }, 
          {
            dataField: 'custPolicyNumber',
            text: 'Policy Number Name',
        //    filter: textFilter()
          }, 
          {
            dataField: 'source',
            text: 'Source',
         //   filter: textFilter()
          },
          {
            dataField: 'custFirstName',
            text: 'First Name',
          //  filter: textFilter()
          },
        
          {
            dataField: 'custLastName',
            text: 'Second Name',
          //  filter: textFilter()
          },
          {
            dataField: 'custContactNumber',
            text: 'Contact Number',
          //  filter: textFilter()
          },
          {
            dataField: 'created_at',
            text: 'Created On',
            //filter: textFilter()
          },
          {
            dataField: 'vFirstName',
            text: 'Verifier First Name',
            //filter: textFilter()
          },
          {
            dataField: 'vLastName',
            text: 'Verifier Last Name',
           // filter: textFilter()
          },
        
        ],
        data: "",
       // group: ""
      };

    componentDidMount(){

        console.log(this.props)
        console.log(this.state)
        this.getAllTransactions()
        document.body.classList.toggle('sidebar-icon-only')
        
    
    }



      getAllTransactions=()=>{
        //console.log(event.target.value)
        axios.get(apiConfig.baseurl+apiConfig.get_transactions).then((response) => {
            console.log(response.data.data);
            this.setState({
            data: response.data.data
            
            }, 
            
            )
          }).catch((error)=>{
            console.log(error)
            //return error;
          })
    }
    



render() {


    const expandRow ={
       
        renderer: (row, rowIndex)=>(
          <div>
            <p>{`Verfied By ${row.vFirstName} ${row.vLastName} on ${row.created_at}`}</p>
            <p>{`Score is ${row.tscore}`}</p>
            <div className="row">
<Card style={{ width: '18rem'}} className="text-center">
<Card.Header style={{alignItems: "center"}}>Original Sign Structure</Card.Header>
<Row className="justify-content-md-center">
    <Col xs={12} sm={4} md={4}>
    <Card.Img style={{height:"45px", width:"45px", alignContent:"center"}} variant="top" src={apiConfig.baseurl+row.original_filename} />
    </Col>
</Row>
  
</Card>
<Card style={{ width: '18rem'}}className="text-center">
            <Card.Header style={{alignItems: "center"}}>Uploaded Sign Structure </Card.Header>
            <Row className="justify-content-md-center">
    <Col xs={12} sm={4} md={4}>
    <Card.Img style={{height:"45px", width:"45px", alignContent:"center"}} variant="top" src={apiConfig.baseurl+row.uploaded_filename} />
    </Col>
</Row>
</Card>
<Card style={{ width: '18rem'}}className="text-center">
            <Card.Header style={{alignItems: "center"}}>Difference Image</Card.Header>
            <Row className="justify-content-md-center">
    <Col xs={12} sm={4} md={4}>
    <Card.Img style={{height:"45px", width:"45px", alignContent:"center"}} variant="top" src={apiConfig.baseurl+row.difference_filename} />
    </Col>
</Row>
</Card>
<Card style={{ width: '18rem'}}className="text-center">
            <Card.Header style={{alignItems: "center"}}>Threshold Image </Card.Header>
            <Row className="justify-content-md-center">
    <Col xs={12} sm={4} md={4}>
    <Card.Img style={{height:"45px", width:"45px", alignContent:"center"}} variant="top" src={apiConfig.baseurl+row.threshold_filename} />
    </Col>
</Row>
</Card>





</div>
           
          </div>
        
        )

      }
    let{columns,data}=this.state

return(
      <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Transaction History</h4>
          <p className="card-description"> Verification Transactions 
          </p>
        { data &&  <BootstrapTable
  keyField='id'
  data={ data }
  columns={ columns }
  expandRow={ expandRow }
/>}

        </div>
      </div>
    </div>
)

}

}
export default withRouter(Reports)