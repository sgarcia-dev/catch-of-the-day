import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import { firebaseApp, base } from "../base";
import { Login } from "./Login";
import { AddFishForm } from "./AddFishForm";
import { EditFishForm } from "./EditFishForm";

export class Inventory extends React.Component {
  static propTypes = {
    storeId: PropTypes.string.isRequired,
    fishes: PropTypes.object,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, {
      context: this
    });

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  render() {
    const Logout = <button onClick={this.logout}>Log Out!</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {Logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Logout}
        {Object.keys(this.props.fishes).map(fishKey => (
          <EditFishForm
            key={fishKey}
            index={fishKey}
            fish={this.props.fishes[fishKey]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}
