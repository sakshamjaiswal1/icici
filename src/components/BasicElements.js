import React, { Component } from "react";
import { Form } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";
import logo from "../assets/images/download.png";
import axios from "axios";
import Transition from "./Transition";
const { REACT_APP_API_URL } = process.env;
export class BasicElements extends Component {
  state = {
    PolicyNumber: "",
    CustomerName: "",
    PhoneNumber: "",
    VerifiersName: "",
    VerifiersID: "",
    Source: "Passbook",
    productimage1: "",
    productimage2: "",
    form: true,
    Trans: false,
    formInfo: {},
    displayimage1: "",
    displayimage2: "",
    photo1: false,
    photo2: false,
    validated: false,
    imageSet1: false,
    imageSet2: false,
    alphaNum: false,
    customSource: false,
  };
  policy = (event) => {
    let letterNumber = /[^0-9a-bA-B\s]/gi;

    if (event.target.value.match(letterNumber)) {
      this.setState({ alphaNum: true });
    }
    this.setState({ PolicyNumber: event.target.value });
  };
  customer = (event) => {
    this.setState({ CustomerName: event.target.value });
  };
  phone = (event) => {
    this.setState({ PhoneNumber: event.target.value });
  };
  name = (event) => {
    this.setState({ VerifiersName: event.target.value });
  };
  id = (event) => {
    this.setState({ VerifiersID: event.target.value });
  };
  source = (event) => {
    this.setState({ Source: event.target.value });
  };

  onFileChange1 = (event) => {
    this.setState({ imageSet1: true });
    this.setState({ productimage1: event.target.files[0] });
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      this.setState({ displayimage1: event.target.result });

      console.log(event.target.result);
      this.setState({ photo1: true });
    };
  };
  onFileChange2 = (event) => {
    this.setState({ imageSet2: true });
    this.setState({ productimage2: event.target.files[0] });
    let reader2 = new FileReader();
    reader2.readAsDataURL(event.target.files[0]);

    reader2.onload = (event) => {
      this.setState({ displayimage2: event.target.result });

      console.log(event.target.result);
      this.setState({ photo2: true });
    };
  };
  onFileUpload = (event) => {
    event.preventDefault();
    if (!this.state.alphaNum) {
      window.alert("Policy Number should be apha-numeric");
    }
    console.log(this.state.alphaNum);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
    }

    this.setState({ validated: true });
    console.log(this.state.validated);

    this.Others = this.Others.bind(this);
    if (
      this.state.validated === true &&
      this.state.imageSet1 &&
      this.state.imageSet2 &&
      this.state.alphaNum
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(this.state.productimage1);

      reader.onload = (event) => {
        this.setState({ productimage1: event.target.result });

        console.log(event.target.result);
      };

      let reader2 = new FileReader();
      reader2.readAsDataURL(this.state.productimage2);

      reader2.onload = (event) => {
        this.setState({ productimage2: event.target.result });

        console.log(event.target.result);
      };

      let formData = new FormData();

      formData.append("PolicyNumber", this.state.PolicyNumber);
      formData.append("CustomerName", this.state.CustomerName);
      formData.append("PhoneNumber", this.state.PhoneNumber);
      formData.append("VerifiersName", this.state.VerifiersName);
      formData.append("VerifiersID", this.state.VerifiersID);
      formData.append("Source", this.state.Source);
      formData.append("productimage", this.state.productimage1);
      formData.append("productimage", this.state.productimage2);

      console.log(formData);
      axios
        .post(`${REACT_APP_API_URL}/api/Verify/Transition`, formData)
        .then((response) => {
          console.log(response);
          this.setState({ formInfo: response.data.data });
          console.log(this.state.formInfo);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(this.state.productimage1);
      console.log(this.state.productimage2);
      this.setState({ form: false, Trans: true });
    }
  };
  passbook = () => {
    this.setState({
      Source: "VoterId",
      customSource: false,
    });
  };
  voterId = () => {
    this.setState({
      Source: "PAN Card",
      customSource: false,
    });
  };
  PANCard = () => {
    this.setState({
      Source: "PAN Card",
      customSource: false,
    });
  };
  Others = (e) => {
    this.setState({ customSource: true, Source: "" });
  };
  componentDidMount() {
    bsCustomFileInput.init();
  }

  render() {
    return (
      <>
        {this.state.form && (
          <div className="d-flex flex-column justify-content-center mb-4">
            <div className="page-header  mx-4 pl-3 col-10 d-flex">
              <img src={logo} alt="logo" />
              <nav className="navbar navbar-expand navbar-light ">
                <ul className="navbar-nav">
                  <li className="nav-item active px-4">
                    <a className="nav-link text-success " href="">
                      <strong>Transaction</strong>
                    </a>
                  </li>
                  <li className="nav-item px-4 ">
                    <a className="nav-link " href="">
                      History
                    </a>
                  </li>
                </ul>
              </nav>

              <h3 className="page-title mt-2 justify-content-center">
                {" "}
                Signature Verification Tool
              </h3>
              <p className=" mt-4 text-muted"> Powered by WIANLEAF </p>
              <hr />
            </div>
            <div className=" mx-4 d-flex">
              <div className="col-5 grid-margin stretch-card">
                <div className="card-body">
                  {/* <h4 className="card-title">Basic form elements</h4> */}
                  {/* <p className="card-description"> Basic form elements </p> */}
                  {/* <form className="forms-sample"> */}
                  <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.onFileUpload}
                    className="forms-sample"
                  >
                    <Form.Group>
                      <label htmlFor="exampleInputName1" className="mt-2">
                        Policy Number*
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control mt-2"
                        id="exampleInputName1"
                        placeholder="Policy Number"
                        onChange={this.policy}
                        value={this.state.PolicyNumber}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter a alpha numeric value
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3 mt-2" className="mt-2">
                        Customer Name*
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control mt-2"
                        id="exampleInputEmail3"
                        placeholder="Customer Name"
                        onChange={this.customer}
                        value={this.state.CustomerName}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <label htmlFor="exampleInputPassword4" className="mt-2">
                        Phone Number*
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control mt-2"
                        id="exampleInputPassword4"
                        placeholder="Contact No"
                        onChange={this.phone}
                        value={this.state.PhoneNumber}
                        required
                      />
                      <Form.Group>
                        <label
                          htmlFor="exampleInputEmail3 mt-2"
                          className="mt-2"
                        >
                          Verifier's Name*
                        </label>
                        <Form.Control
                          type="text"
                          className="form-control mt-2"
                          id="exampleVerifierName"
                          placeholder="Name"
                          onChange={this.name}
                          value={this.state.VerifiersName}
                          required
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
                          onChange={this.id}
                          value={this.state.VerifiersID}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        {!this.state.customSource ? (
                          <div>
                            <label
                              htmlfor="inputState"
                              className="mt-4 mx-1 mb-2"
                            >
                              Source*
                            </label>
                            <div>
                              <label
                                htmlfor="inputState"
                                className="mt-2 mx-2 mb-2"
                              >
                                Passbook
                              </label>
                              <input
                                type="radio"
                                name="source"
                                value="Passbook"
                                onClick={(e) => {
                                  this.setState({ Source: e.target.value });
                                  console.log(e.target.value);
                                }}
                              />
                              <label
                                htmlfor="inputState"
                                className="mt-2   mx-2 mb-2"
                              >
                                VoterId
                              </label>

                              <input
                                type="radio"
                                name="source"
                                value="VoterId"
                                onClick={(e) => {
                                  this.setState({ Source: e.target.value });
                                  console.log(e.target.value);
                                }}
                              />
                              <label
                                htmlfor="inputState"
                                className="mt-2   mx-2 mb-2"
                              >
                                PANCard
                              </label>
                              <input
                                type="radio"
                                name="source"
                                value="PANCard"
                                onClick={(e) => {
                                  this.setState({ Source: e.target.value });
                                  console.log(e.target.value);
                                }}
                              />
                              <label
                                htmlfor="inputState"
                                className="mt-2  mx-2 mb-2"
                              >
                                Others
                              </label>

                              <input
                                type="radio"
                                name="source"
                                value=""
                                onClick={(e) => {
                                  this.setState({ Source: e.target.value });
                                  this.setState({ customSource: true });
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <Form.Group>
                            <label
                              htmlFor="exampleInputEmail3 mt-2"
                              className="mt-2"
                            >
                              Enter Custom Source*
                            </label>
                            <Form.Control
                              type="text"
                              className="form-control mt-2"
                              id="exampleVerifierID"
                              placeholder="Enter Custom Source"
                              onChange={(e) =>
                                this.setState({ Source: e.target.value })
                              }
                              value={this.state.Source}
                              required
                            />
                          </Form.Group>
                        )}
                      </Form.Group>

                      <hr />
                      <label>Admitted Signature*</label>
                      <div className="custom-file mt-2">
                        <Form.Control
                          type="file"
                          className="form-control visibility-hidden mt-2"
                          id="customFileLang"
                          lang="es"
                          onChange={this.onFileChange1}
                          required
                        />
                      </div>
                      <label className="mt-2">Questioned Signature*</label>
                      <div className="custom-file mt-2">
                        <Form.Control
                          type="file"
                          className="form-control visibility-hidden mt-2"
                          id="customFileLang"
                          lang="es"
                          onChange={this.onFileChange2}
                          required
                        />
                      </div>
                    </Form.Group>

                    <button
                      type="submit"
                      className="btn btn-primary mr-2 mt-4"
                      // onClick={this.onFileUpload}
                    >
                      Submit
                    </button>
                    <button className="btn btn-light mx-4 mt-4">Cancel</button>
                  </Form>
                  {/* </form> */}
                </div>
              </div>
              {this.state.photo1 && (
                <div className="sign__con1 d-flex flex-column mx-1" id="photo1">
                  <div className="">
                    <h4 className="mb-4">Admitted Signature</h4>
                    <img
                      className="col-8"
                      src={this.state.displayimage1}
                      alt=""
                    />
                  </div>
                </div>
              )}
              {this.state.photo2 && (
                <div className="sign__con1 d-flex flex-column mx-1" id="photo2">
                  <div className="">
                    <h4 className="mb-4">Questioned Signature</h4>
                    <img
                      className="col-8"
                      src={this.state.displayimage2}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.Trans && <Transition fileInfo={this.state.formInfo} />}
        {}
      </>
    );
  }
}

export default BasicElements;
