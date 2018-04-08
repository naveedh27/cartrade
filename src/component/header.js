import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from '../App'

const HeaderCon = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Sell">Sell</Link>
        </li>
        <li>
          <Link to="/Order">Order Book</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={App} />
    </div>
  </Router>
);
export default HeaderCon;
