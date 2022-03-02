import React from "react";
import logo from "../assets/images/download.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import bsCustomFileInput from "bs-custom-file-input";
import { Link } from 'react-router-dom'
const { REACT_APP_API_URL } = process.env;

function History() {
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState({
    // startDate:'',
    // endDate:''
  });
  const [disExcel, setdisExcel] = useState({
    first:false,
    second:false,
  });

  // console.log(REACT_APP_API_URL)
  const [excel, setExcel] = useState({});
  const apiCall = async () => {
    const response = await axios.post(
      "http://localhost:3000//api/TransitionList",
      date
    );
    const data2 = await response.data.data;
    setHistory(data2);
    console.log(history);
    // console.log(date)
  };

  const excelApiCall = async () => {
    const response = await axios.post( "http://localhost:3000//api/excel", date, {
      responseType: "arraybuffer",
    });
    const data2 = await response.data;
    const file = new Blob([data2], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileURL = window.URL.createObjectURL(file);
    window.open(fileURL);

    setExcel(data2);
    console.log(data2);
    // console.log(date)
  };
  // const tableId=document.getElementById(`${index+1001}`)
  const handleSubmit = (num) => {
    // axios
    //   .post("http://localhost:4001/api/create/pdf", {
    //     responseType: "blob",
    //     PolicyNumber: "sasdasd",
    //   })
    //   .then((res) => {
    //     const pdfBlob = new Blob([res.data], { type: "application/pdf" });

    //     saveAs(pdfBlob, "newPdf.pdf");
    //   });
    // const headers={
    //   responseType: 'blob'
    // }

    axios
      .post(
        "http://3.110.47.142:5000/api/create/pdf",
        { PolicyNumber: num },
        { responseType: "arraybuffer" }
      )
      .then((res) => {
        console.log(res.data);
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);
        // saveAs(fileURL, 'newPdf.pdf');
      });

    // const pdfBlob = new Blob([res.data],{type : 'application/pdf'});
    //  let fileURL = URL.createObjectURL(res.data);

    // console.log(fileURL)
    // window.open(fileURL);
    // saveAs(fileURL, 'newPdf.pdf');
  };

  useEffect(() => {
    apiCall();

    console.log("useEffect");
  }, []);

  return (
    <div className="d-flex flex-column align-items-center mb-4">
      <div className="page-header  mx-4 pl-3 col-11 d-flex ">
        <img src={logo} alt="logo" />
        <nav className="navbar navbar-expand navbar-light ">
          <ul className="navbar-nav">
            <li className="nav-item active px-4">
              {/* <a className="nav-link " href="">
                Transaction{" "}
              </a> */}
              <Link to="/" className=''>Transaction</Link>

            </li>
            <li className="nav-item px-4 ">
              {/* <a className="nav-link text-success" href="">
                <strong>History</strong>
              </a> */}
              <Link to="/his" className='  '>History</Link>


            </li>
          </ul>
        </nav>
      </div>
      <div className="border"></div>
      <h1 className="page-title mt-2 ">Transaction History</h1>
      <div className="transactionsCon mx-4 pl-3 col-9 border d-flex flex-column align-items-center mb-4 overflow-auto">
        <h4 className=" mt-4">Select Date</h4>
        <div className="d-flex align-items-center flex-row justify-content-around mt-4">
          <label htmlFor="start" className="mx-2">
            Start:-{" "}
          </label>
          <input
            type="date"
            id="start"
            value={date.start}
            onChange={(e) => {
              setDate({ ...date, startDate: e.target.value })
       
              console.log(disExcel)

            }}
            className="form-control mx-2 "
            name="start"
          />
          <label htmlFor="end" className="mx-2">
            End:-
          </label>

          <input
            type="date"
            id="end"
            value={date.end}
            onChange={(e) => {
              setDate({ ...date, endDate: e.target.value });
              // setdisExcel({...disExcel,first:true})
              setdisExcel({...disExcel,second:true})
              console.log(disExcel)
            }}
            className="form-control mx-2"
            name="end"
          />
          <button
            className="btn btn-primary mx-2 "
            onClick={() => {
              apiCall();
            }}
          >
            Submit
          </button>
         { !disExcel.second && <fieldset disabled>
          <button
            className="btn btn-secondary mx-2 "
            onClick={() => {
              // excelApiCall();
            }}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-bar-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
              />
            </svg>{" "} */}
            Export
          </button>
          </fieldset>}
         { (disExcel.second) &&<button
            className="btn btn-primary mx-2 "
            onClick={() => {
              excelApiCall();
            }}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-bar-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
              />
            </svg>{" "} */}
            Export
          </button>}
        </div>

        <hr />
        <div className="tableCon mb-4 overflow-auto ">
          <div className="mx-2">
            {history.length == 0 ? (
              <>
                <h4 className="mt-4">
                  Sorry! No data available for the selected range{" "}
                </h4>
              </>
            ) : (
              <table className="table ">
                <thead
                // id={index}
                // style={{ display: "none" }}
                >
                  <tr>
                    <th scope="col" className="">
                      ID
                    </th>

                    <th scope="col">Policy Number</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Services</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Matched</th>
                    <th scope="col">Percentage Matched</th>
                    {/* <th scope="col">Report</th> */}
                  </tr>
                </thead>
                {history.map(
                  (
                    {
                      PolicyNumber,
                      CustomerName,
                      PhoneNumber,
                      VerifiersName,
                      VerifiersID,
                      Source,
                      Matched,
                      score,
                      AdmittedSigneture1,
                      AdmittedSigneture2,
                      createdAt,
                      updatedAt,
                      resp_img2,
                      resp_img1,
                      percentage,
                    },
                    index
                  ) => {
                    // const tableId=document.getElementById(`${index}`)
                    // tableId.style.display='none'
                    return (
                      <tbody>
                        <tr
                          className="pointer"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const id = document.getElementById(`${index}`);

                            if (id.style.display == "none") {
                              id.style.display = "";
                            } else {
                              id.style.display = "none";
                            }
                          }}
                        >
                          <td>{index + 1}</td>
                          <td className="">
                            {PolicyNumber ? PolicyNumber : "--"}
                          </td>
                          <td>{CustomerName ? CustomerName : "--"}</td>
                          <td>{PhoneNumber ? PhoneNumber : "--"}</td>
                          <td>{VerifiersName ? VerifiersName : "--"}</td>
                          <td>{createdAt}</td>
                          <td>{Matched}</td>
                          <td>{percentage}</td>
                          {/* <td>
                          <button className="btn btn-primary px-3 py-0" onClick={()=>{
                            const id= document.getElementById(`${index}` )
                                id.style.display='none'
                          }} >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-bar-down"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                              />
                            </svg>
                          </button>
                        </td> */}
                        </tr>

                        <tr id={index} style={{ display: "none" }}>
                          <td colspan="8">
                            <div className="tabCon mx-4 px-2 mb-4">
                              <p>Verified by -{VerifiersName} </p>
                              <p>Score -{percentage}</p>
                              <button
                                className="btn btn-primary mt-1 mb-4"
                                onClick={() => handleSubmit(PolicyNumber)}
                              >
                                Download Report
                              </button>
                              <div className="d-flex">
                                <div className="mx-2">
                                  <p>Customer Admitted Signature</p>
                                </div>
                                <div className="mx-2">
                                  <span>Customer Questioned Signature</span>
                                </div>
                                <div className="mx-2">
                                  <span>Admitted Signature Highlight</span>
                                </div>
                                <div className="mx-2">
                                  <span>Questioned Signature Highlight</span>
                                </div>
                              </div>
                              <div className="d-flex">
                                <img
                                  className="col-3"
                                  src={AdmittedSigneture1}
                                  alt="Admitted"
                                />
                                <img
                                  className="col-3"
                                  src={AdmittedSigneture2}
                                  alt="Questioned"
                                />
                                <img src={resp_img1} alt="" />
                                <img src={resp_img2} alt="" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                )}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
