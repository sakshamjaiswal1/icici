import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import BasicElements from './components/BasicElements';
import Transition from "./components/Transition";
import History from "./components/History";

function App() {
  return (
    <div className="App">
    <Router>
   
      <Switch>
        <Route exact path="/">
         <BasicElements/>
        </Route>
        <Route  exact path="/1">
     
    <BasicElements/>
        </Route>
        <Route exact path="/trn">
     <Transition/>

         </Route>
         <Route exact path="/his">
     <History/>

         </Route>
        <Route path="*">
         <h1>Please define a valid url</h1>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
