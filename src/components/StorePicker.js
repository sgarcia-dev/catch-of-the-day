import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

export class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  myInput = React.createRef();

  gotoStore = event => {
    event.preventDefault();
    const storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.gotoStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}
