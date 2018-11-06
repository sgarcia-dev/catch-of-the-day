import React from "react";

import { base } from "../base";
import { Header } from "./Header";
import { Order } from "./Order";
import { Inventory } from "./Inventory";
import { Fish } from "./Fish";

import samplesFishes from "../sample-fishes";

export class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { storeId } = this.props.match.params;
    const cachedOrder = localStorage.getItem(storeId);
    if (cachedOrder) {
      this.setState({ order: JSON.parse(cachedOrder) });
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  componentDidUpdate() {
    const { storeId } = this.props.match.params;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: samplesFishes
    });
  };

  addFish = fish => {
    console.log("Adding this fish:");
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;

    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;

    this.setState({ fishes });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] ? order[key] + 1 : 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];

    this.setState({ order });
  };

  render() {
    const fishesHtml = Object.keys(this.state.fishes).map(key => (
      <Fish
        key={key}
        index={key}
        details={this.state.fishes[key]}
        addToOrder={this.addToOrder}
      />
    ));

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">{fishesHtml}</ul>
        </div>
        <Order
          order={this.state.order}
          fishes={this.state.fishes}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
