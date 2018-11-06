import React from "react";
import PropTypes from "prop-types";

export const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage this store's inventory.</p>
    <button
      className="github"
      onClick={() => {
        props.authenticate("Github");
      }}
    >
      Login with Github
    </button>
    <button
      className="facebook"
      onClick={() => {
        props.authenticate("Facebook");
      }}
    >
      Login with Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};
