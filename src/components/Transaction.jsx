import React from 'react'

function Transaction({PolicyNumber,CustomerName,PhoneNumber,VerifiersName,VerifiersID,Source,Matched,score,AdmittedSigneture1,AdmittedSigneture2,createdAt,updatedAt}) {
    return (
        <div className="d-flex flex-column justify-content-center mb-4">
        <div className="page-header  mx-4 pl-3 col-10 d-flex">
          <img src={logo} alt="logo" />

          <nav className="navbar navbar-expand navbar-light ">
            <ul className="navbar-nav">
              <li className="nav-item active px-4">
                <a className="nav-link text-success " href="">
                  <strong>
                  Transaction

                  </strong>

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
            Verify Transaction{" "}
          </h3>
          <hr />
        </div>
        <div className=" mx-4 d-flex">
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
                    value={this.state.PolicyNumber}
                  />
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
                    // onChange={this.customer}
                    value={this.state.CustomerName}
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4" className="mt-2">
                    Phone Number
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control mt-2"
                    id="exampleInputPassword4"
                    placeholder="Contact No"
                    // onChange={this.phone}
                    value={this.state.PhoneNumber}
                  />
                  <Form.Group>
                    <label htmlFor="exampleInputEmail3 mt-2" className="mt-2">
                      Verifier's Name*
                    </label>
                    <Form.Control
                      type="email"
                      className="form-control mt-2"
                      id="exampleVerifierName"
                      placeholder="Name"
                      // onChange={this.name}
                      value={this.state.VerifiersName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputEmail3 mt-2" className="mt-2">
                      Verifier's ID*
                    </label>
                    <Form.Control
                      type="text"
                      className="form-control mt-2"
                      id="exampleVerifierID"
                      placeholder="Id"
                      // onChange={this.id}
                      value={this.state.VerifiersID}
                    />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputEmail3 mt-2" className="mt-2">
                      Source*
                    </label>
                    <Form.Control
                      type="text"
                      className="form-control mt-2"
                      id="exampleSource"
                      placeholder="Source"
                      // onChange={this.source}
                      value={this.state.Source}
                    />
                  </Form.Group>
                  <hr />
                  <label>Matched </label>
                  <div className="custom-file mt-2">
                    <Form.Control
                      type="text"
                      className="form-control visibility-hidden mt-2"
                      id="customFileLang"
                      lang="es"
                      value={this.state.Matched}
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
                      value={this.state.score}
                      //   onChange={this.onFileChange2}
                    />
                  </div>
                </Form.Group>

                <button
                  type="submit"
                  className="btn btn-primary mr-2 mt-4"
                  // onClick={this.onFileUpload}
                >
                  Transaction History
                </button>
                <button
                  className="btn btn-primary mx-4 mt-4"
                  // onClick={this.handleSubmit}
                >
                  Generate Report
                </button>
              </form>
            </div>
          </div>
          <div className="sign__con1 d-flex flex-column mx-4">
           <div className="">
            <h4 className="mb-4">Original Sign</h4>
            <img src={this.props.productimage1} alt="" />
            </div>
            <h4>Updated Highlight Signature</h4>
          </div>
          <div className="sign__con1 d-flex flex-column mx-4">
            <div className="">
            <h4 className="mb-4">Uploaded Sign</h4>
            <img src={this.props.productimage2} alt="" />
            </div>
            <h4>Original Highlight Signature</h4>
          </div>
        </div>
      </div>
    )
}

export default Transaction
