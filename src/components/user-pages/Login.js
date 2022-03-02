import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Buttons } from 'react-bootstrap';
// import {signin} from '../services/login_service';
import axios from 'axios';
// import apiConfig from '../constants/apiurls'
import { Redirect, Route } from "react-router";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { PropTypes } from "prop-types";
import logo from  '../../assets/images/download.png'


// import { loginWithEmailAndPassword } from "../redux/actions/LoginAction"

export class Login extends Component {

  state = {
    email: "admin@gmail.com",
    password: "123456789",
    group: ""
  };

  handleChange = event => {
    console.log(event.target.value)
    event.persist();
    this.setState({
      [event.target.name]: event.target.value

    });
  };

  handleSubmit(event) {
    console.log(event.target.elements)

}

 handlelogin=event=>{
  // console.log(event.target)
  // loginWithEmailAndPassword(this.state.username,this.state.password)

  axios.post("https://093f831877bf.ngrok.io/api/signin", {
    email: this.state.email,
    password: this.state.password
  }).then((response) => {
    console.log(response);

    // localStorage.setItem("access",response.data.access);
    // localStorage.setItem("refresh",response.data.refresh);
    // localStorage.setItem("group",response.data.group)
    // localStorage.setItem("firstName",response.data.firstName)
    // localStorage.setItem("lastName",response.data.lastName)
    // localStorage.setItem("email",response.data.email)
    // localStorage.setItem("username",response.data.username)
    // response.data;
    // if (response.data.group==="admin"){

    //   this.props.history.push("/dashboard")
    // }
    // else{

    //   this.props.history.push("/user-pages/verifier")


    // }
  }).catch((error)=>{
    console.log(error)
    //return error;
  })



}




  render() {

    // let{username,password}=this.state;
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 ">
          <div className="row w-100 mx-0 m-4">
            <div className="col-lg-4 mx-auto border">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h4>Signature Matching Tool</h4>
               {/* <h6 className="font-weight-light">Sign in to continue.</h6> */}
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" name ="username" placeholder="Username" size="lg" className="h-auto" 
                    
                    onChange={this.handleChange} 
                    
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" name="password" placeholder="Password" size="lg" className="h-auto" 
                    
                    onChange={this.handleChange} 
                    />
                  </Form.Group>
                  <div className="mt-3">
                  <button type="button" className="btn btn-primary btn-facebook auth-form-btn" 
                  onClick={this.handlelogin}
                  >
                      Login
                    </button>
                   {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link>*/}
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="/1" 
                    // onClick={event => event.preventDefault()} 
                    className="auth-link text-black">Forgot password?</a>
                  </div>
                {/*  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> */}
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login
