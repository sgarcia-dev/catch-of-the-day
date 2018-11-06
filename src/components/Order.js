import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { formatPrice } from "../helpers";

export class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object,
    fishes: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  getTotal = () => {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return total;
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    if (!fish) {
      return null;
    }

    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 }
    };

    const isAvailable = fish.status === "available";
    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          {/* <TransitionGroup component="span" className="count">
            <CSSTransition
              classNames="count"
              key={count}
              timeout={{ enter: 250, exit: 250 }}
            >
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup> */}
          {count}
          kg {fish.name}
          {formatPrice(count * fish.price)}
          <button
            onClick={() => {
              this.props.removeFromOrder(key);
            }}
          >
            &times;`
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const total = this.getTotal();
    const orderIds = Object.keys(this.props.order);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
