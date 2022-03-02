import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Buttons, Card } from 'react-bootstrap';
import {signin} from '../services/login_service';
import axios from 'axios';
import apiConfig from '../constants/apiurls'
import { Redirect, Route } from "react-router";
import { withRouter } from "react-router-dom";

export class Verfier extends Component {

    state = {
        custImage:"",
        custFirstName:"",
        custMiddleName:"",
        custLastName:"",
        custPolicynum:"",
        custContact:"",
        custEmail:"",
        tobeverifiedFile:"",
        imgSrc:"",
        difference_image:"",
        threshold_image:"",
        uploaded_image:"",
        verified_image:"",
        score:""
      };

componentDidMount(){

    console.log(this.props)
    console.log(this.state)
    document.body.classList.toggle('sidebar-icon-only')

}
handleFile=(event)=>{

    console.log(event.target.files[0]);
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
      }.bind(this);

    this.setState({

        tobeverifiedFile:event.target.files[0]
    })

}

matchSignature=(event)=>{
    //event.PreventDefault()
    event.preventDefault();

    //var file=file['file'];
    var formData = new FormData();
    formData.append('file',this.state.tobeverifiedFile);
    formData.append('custPolicynum',this.state.custPolicynum)
    formData.append('custFirstName',this.state.custFirstName)
    formData.append('custMiddleName',this.state.custMiddleName)
    formData.append('custContactNumber',this.state.custContact)
    formData.append('custLastName',this.state.custLastName)
    formData.append('source',"Pan")
    formData.append('verifierUserName',localStorage.getItem("username"))
    formData.append('vFirstName',localStorage.getItem('firstName'))
    formData.append('vLastName',localStorage.getItem('lastName'))
    formData.append('vEmail',localStorage.getItem("email"))

   /* "custFirstName": "Dhanuk",
        "custMiddleName": "Sabareesan",
        "custLastName": "Sankaran",
        "custPolicyNumber": "21100345",
        "custContactNumber": "9922942347",
        "source": "Pan",
        "verfierUserName": "sabs@technicious.in",
        "tscore": 0.8056882998452665,
        "inconclusive": false,
        "created_at": "2021-01-06T20:21:02.146199Z",
        "original_filename": "/media/original/21100345_original_6230189227086.png",
        "uploaded_filename": "/media/uploaded/21100345_uploaded_6230189227086.png",
        "difference_filename": "/media/difference/21100345_difference_6230189227086.png",
        "threshold_filename": "/media/threshold/21100345_threshold_6230189227086.png",
        "vFirstName": "Sabareesan",
        "vLastName": "Sankaran",
        "vEmail": "sabs@technicious.in"*/
    
    console.log(formData);
    const config = {headers:{'Content-Type': 'multipart/form-data'}};
    var api_url = apiConfig.baseurl+apiConfig.img_match
    axios.post(api_url,formData,config).then((response)=>{
        console.log(response.data)

        this.setState({

            threshold_image:apiConfig.baseurl+response.data.transaction.threshold_filename,
            difference_image:apiConfig.baseurl+response.data.transaction.difference_filename,
            uploaded_image:apiConfig.baseurl+response.data.transaction.uploaded_filename,
            verified_image:apiConfig.baseurl+response.data.transaction.original_filename,
            score:response.data.score



        })
    })



}

searchPolicyNumber=(event)=>{
    console.log(event.target.value)
    axios.get(apiConfig.baseurl+apiConfig.policy_holder, {params:{custPolicynum:event.target.value}
        }).then((response) => {
        console.log(response.data);
        var data=response.data.data
        console.log(response.data.data.custImage)
        this.setState({

            custImage:apiConfig.baseurl+response.data.data.custImage,
            custFirstName:response.data.data.custFirstName,
            custMiddleName:response.data.data.custMiddleName,
            custLastName:response.data.data.custLastName,
            custPolicynum:response.data.data.custPolicynum,
            custContact:response.data.data.custContact,
            custEmail:response.data.data.custEmail
            
        }, 
        
        )
      }).catch((error)=>{
        console.log(error)
        //return error;
      })
}

render() {

    let{username,password,score,custImage,threshold_image,verified_image,difference_image,uploaded_image,custContact,custFirstName,custMiddleName,custLastName,custEmail, imgSrc}=this.state

    return (
      <div className>
          <div className="row">
     <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Upload Signature</h4>
                
                <p className="card-description"> Basic form layout </p>
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="exampleInputUsername1">Policy Number</label>
                    <Form.Control type="text" id="exampleInputUsername1" placeholder="Username" size="lg" onBlur={this.searchPolicyNumber} />
                  </Form.Group>
                 { score && <Form.Group>
                    <label htmlFor="exampleInputEmail1">Match Score</label>
                    <Form.Control type="email" style={{fontWeight:'bold', fontSize:"25px"}} className="form-control" defaultValue={score} id="exampleInputEmail1" placeholder="Email" />
                  </Form.Group> }
                  <Form.Group>
                    <label htmlFor="exampleInputEmail1">Customer Email</label>
                    <Form.Control type="email" className="form-control" defaultValue={custEmail} id="exampleInputEmail1" placeholder="Email" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputPassword1">Customer First Name</label>
                    <Form.Control type="text" className="form-control" defaultValue={custFirstName} id="exampleInputPassword1" placeholder="First Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputConfirmPassword1">Customer Second Name</label>
                    <Form.Control type="text" className="form-control" defaultValue={custLastName} id="exampleInputConfirmPassword1" placeholder="Second Name" />
                  </Form.Group>
                  <Form.Group>
                    <label>Signature upload</label>
                    <div className="custom-file">
                      <Form.Control onChange={this.handleFile}type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                      <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Remember me
                    </label>
                  </div>
                  <button type="submit" onClick={this.matchSignature} className="btn btn-primary mr-2">Submit</button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
            
            <div>
                <div class="row">
            <Card style={{ width: '18rem'}} className="text-center">
            <Card.Header style={{alignItems: "center"}}>Original Sign</Card.Header>
  <Card.Img variant="top" src={this.state.custImage} />
</Card>
<Card style={{ width: '18rem'}} className="text-center">
<Card.Header style={{alignItems: "center"}}>Original Sign Structure</Card.Header>
  <Card.Img variant="top" src={uploaded_image} />
</Card>
{/*<Card style={{ width: '18rem'}}>
  <Card.Img variant="top" src={threshold_image} />
                 </Card>*/}
</div>

</div>
<div>
            <Card style={{ width: '18rem'}}className="text-center">
            <Card.Header style={{alignItems: "center"}}>Uploaded Sign </Card.Header>
  <Card.Img variant="top" src={imgSrc} />
</Card>

<Card style={{ width: '18rem'}}className="text-center">
            <Card.Header style={{alignItems: "center"}}>Uploaded Sign Structure </Card.Header>
  <Card.Img variant="top" src={verified_image} />
</Card>
{/*<Card style={{ width: '18rem'}}>
  <Card.Img variant="top" src={difference_image} />
                </Card>*/}

</div>


          </div>
</div>
      </div>
    )
  }
}

export default withRouter(Verfier)
