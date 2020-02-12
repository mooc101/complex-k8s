import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from "react";

import logo from "./logo.svg";
import "./App.css";
import Fib from "./Fib";
import NewPage from "./NewPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fib Calculator v2</h1>
          <Link to="/">Home</Link>
          <Link to="/newpage">New Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/newpage" component={NewPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
