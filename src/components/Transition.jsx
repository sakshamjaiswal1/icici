import React, { Component } from "react";
import { Form } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";
import logo from "../assets/images/download.png";
import axios from "axios";
import { saveAs } from "file-saver";
import History from "./History";
import { Link } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

export class Transition extends Component {
  state = {
    PolicyNumber: this.props.fileInfo.PolicyNumber,
    CustomerName: this.props.fileInfo.CustomerName,
    PhoneNumber: this.props.fileInfo.PhoneNumber,
    VerifiersName: this.props.fileInfo.VerifiersName,
    VerifiersID: this.props.fileInfo.VerifiersID,
    Source: this.props.fileInfo.Source,
    distance: this.props.fileInfo.distance,
    error: this.props.fileInfo.error,
    threshold: this.props.fileInfo.threshold,
    difference: this.props.fileInfo.difference,
    Matched: this.props.fileInfo.Matched,
    percentage: this.props.fileInfo.percentage,
    productimage1: this.props.fileInfo.AdmittedSigneture1,
    productimage2: this.props.fileInfo.AdmittedSigneture2,
    productimage3: this.props.fileInfo.resp_img1,
    productimage4: this.props.fileInfo.resp_img2,
    fileInfo: this.props.fileInfo,
    history: false,
    trans: true,
    historyData: {},
    resColor: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${REACT_APP_API_URL}/api/create/pdf`,
        { PolicyNumber: this.props.fileInfo.PolicyNumber },
        { responseType: "arraybuffer" }
      )
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);
      });
  };

  componentDidMount() {
    bsCustomFileInput.init();
    this.setState({ fileInfo: this.props.fileInfo });
    console.log(this.state.fileInfo);
  }

  history = (event) => {
    event.preventDefault();
    axios
      .post(`${REACT_APP_API_URL}/api/TransitionList`)
      .then((response) => {
        console.log(response);
        this.setState({ historyData: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ history: true, trans: false });
  };
  render() {
    return (
      <>
        {this.state.trans && (
          <div className="d-flex flex-column justify-content-center mb-4">
            <div className="page-header  mx-4 pl-3 col-10 d-flex">
              <img src={logo} alt="logo" />

              <nav className="navbar navbar-expand navbar-light ">
                <ul className="navbar-nav">
                  <li className="nav-item active px-4">
                    {/* <a className="nav-link text-success " href="">
                  Transaction{" "}
                </a> */}

                    <Link to="/" className="  ">
                      Transaction
                    </Link>
                  </li>
                  <li className="nav-item px-4 ">
                    {/* <a className="nav-link " href="">
                  History
                </a> */}
                    <Link to="/his" className="  ">
                      History
                    </Link>
                  </li>
                </ul>
              </nav>
              <h3 className="page-title mt-2 justify-content-center">
                {" "}
                Signiture Verification Tool{" "}
              </h3>
              <hr />
            </div>
            <div className=" mx-4 d-flex">
              {this.props.fileInfo.error != "false" ? (
                <>
                  <h4 className="mt-4">Verification In Progress</h4>
                </>
              ) : (
                <>
                  <div className="col-5 grid-margin stretch-card">
                    <div className="card-body">
                      {/* <h4 className="card-title">Basic form elements</h4> */}
                      {/* <p className="card-description"> Basic form elements </p> */}
                      <form className="forms-sample">
                        <Form.Group>
                          <label htmlFor="exampleInputName1" className="mt-2">
                            Policy Number*
                          </label>
                          <Form.Control
                            type="text"
                            className="form-control mt-2"
                            id="exampleInputName1"
                            placeholder="Policy Number"
                            // onChange={this.policy}
                            value={this.props.fileInfo.PolicyNumber}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label
                            htmlFor="exampleInputEmail3 mt-2"
                            className="mt-2"
                          >
                            Customer Name*
                          </label>
                          <Form.Control
                            type="text"
                            className="form-control mt-2"
                            id="exampleInputEmail3"
                            placeholder="Customer Name"
                            // onChange={this.customer}
                            value={this.props.fileInfo.CustomerName}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label
                            htmlFor="exampleInputPassword4"
                            className="mt-2"
                          >
                            Phone Number
                          </label>
                          <Form.Control
                            type="text"
                            className="form-control mt-2"
                            id="exampleInputPassword4"
                            placeholder="Contact No"
                            onChange={this.phone}
                            value={this.props.fileInfo.PhoneNumber}
                          />
                          <Form.Group>
                            <label
                              htmlFor="exampleInputEmail3 mt-2"
                              className="mt-2"
                            >
                              Verifier's Name*
                            </label>
                            <Form.Control
                              type="email"
                              className="form-control mt-2"
                              id="exampleVerifierName"
                              placeholder="Name"
                              // onChange={this.name}
                              value={this.props.fileInfo.VerifiersName}
                            />
                          </Form.Group>
                          <Form.Group>
                            <label
                              htmlFor="exampleInputEmail3 mt-2"
                              className="mt-2"
                            >
                              Verifier's ID*
                            </label>
                            <Form.Control
                              type="text"
                              className="form-control mt-2"
                              id="exampleVerifierID"
                              placeholder="Id"
                              // onChange={this.id}
                              value={this.props.fileInfo.VerifiersID}
                            />
                          </Form.Group>
                          <Form.Group>
                            <label
                              htmlFor="exampleInputEmail3 mt-2"
                              className="mt-2"
                            >
                              Source*
                            </label>
                            <Form.Control
                              type="text"
                              className="form-control mt-2"
                              id="exampleSource"
                              placeholder="Source"
                              // onChange={this.source}
                              value={this.props.fileInfo.Source}
                            />
                          </Form.Group>
                          <hr />
                          {/* <label className="mt-2">Distance </label>
                          <div className="custom-file mt-2">
                            <Form.Control
                              type="text"
                              className="form-control visibility-hidden mt-2"
                              id="customFileLang"
                              lang="es"
                              value={this.props.fileInfo.distance}
                              //   onChange={this.onFileChange1}
                            />
                          </div> */}
                          {/* <label className="mt-2">Error </label>
                          <div className="custom-file mt-2">
                            <Form.Control
                              type="text"
                              className="form-control visibility-hidden mt-2"
                              id="customFileLang"
                              lang="es"
                              value={this.props.fileInfo.error}
                              //   onChange={this.onFileChange1}
                            />
                          </div> */}
                          {/* <label className="mt-2">Threshold </label>
                          <div className="custom-file mt-2">
                            <Form.Control
                              type="text"
                              className="form-control visibility-hidden mt-2"
                              id="customFileLang"
                              lang="es"
                              value={this.props.fileInfo.threshold}
                              //   onChange={this.onFileChange1}
                            />
                          </div> */}
                          <label className="mt-2">Result</label>
                          <div className="custom-file mt-2">
                            <Form.Control
                              type="text"
                              className="form-control visibility-hidden mt-2"
                              id="customFileLang"
                              lang="es"
                              style={{
                                color: `${
                                  this.props.fileInfo.Matched == "true"
                                    ? "green"
                                    : "red"
                                }`,
                              }}
                              value={
                                this.props.fileInfo.Matched == "true"
                                  ? "Passed"
                                  : "Failed"
                              }
                              //   onChange={this.onFileChange1}
                            />
                          </div>
                          <label className="mt-2">Matched Score</label>
                          <div className="custom-file mt-2">
                            <Form.Control
                              type="text"
                              className="form-control visibility-hidden mt-2"
                              id="customFileLang"
                              lang="es"
                              value={this.props.fileInfo.percentage}
                              //   onChange={this.onFileChange2}
                            />
                          </div>
                          {/* <label className="mt-2">Difference</label>
                          <div className="custom-file mt-2">
                            <Form.Control
                              as="textarea"
                              rows={10}
                              type="text"
                              className="form-control visibility-hidden mt-2"
                              id="customFileLang"
                              lang="es"
                              value={this.props.fileInfo.difference}
                              //   onChange={this.onFileChange2}
                            />
                          </div> */}
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group> */}
                        {/* <button
                  type="submit"
                  className="btn btn-primary mr-2 mt-4"
                  onClick={this.history}
                > */}

                        <Link to="/his" className="  btn btn-primary mr-2 mt-4">
                          {" "}
                          Transaction History
                        </Link>
                        {/* </button> */}
                        <button
                          className="btn btn-primary mx-4 mt-4"
                          onClick={this.handleSubmit}
                        >
                          Generate Report
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="sign__con1 d-flex flex-column mx-4">
                    <div className="">
                      <h4 className="mb-4">Admitted Signature</h4>
                      <img
                        className="col-6"
                        src={this.props.fileInfo.AdmittedSigneture1}
                        alt=""
                      />
                    </div>
                    {/* <div className="">

                    <h4 className="mb-4"> Admitted Highlight Signature </h4>
                    <img
                      className="col-6"
                      src={this.props.fileInfo.resp_img1}
                      alt=""
                    />
                  </div> */}
                  </div>
                  <div className="sign__con1 d-flex flex-column mx-4">
                    <div className="">
                      <h4 className="mb-4">Questioned Signature</h4>
                      <img
                        className="col-6"
                        src={this.props.fileInfo.AdmittedSigneture2}
                        alt=""
                      />
                    </div>
                    {/* <div className="">

                    <h4 className="mb-4"> Questioned Highlight Signature</h4>
                    <img
                      className="col-6"
                      src={this.props.fileInfo.resp_img2}
                      alt=""
                    />
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Transition;
