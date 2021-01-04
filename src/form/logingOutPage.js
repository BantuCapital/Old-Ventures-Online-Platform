import React, { Component } from "react";
import Loading from "./loading";
import "../App.css";

import axios from "axios";
class logingOutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
    };
  }

  async handledone() {
    localStorage.clear();
    setTimeout(() => {
      this.setState({ load: true });
      setTimeout(() => {
        this.props.history.push("/login");
      }, 800);
    }, 2000);
  }

  componentDidMount() {
    this.handledone();
  }
  render() {
    return (
      <div className="loading">
        <Loading loading={this.state.load} />
        <h3>Loging you out </h3>
      </div>
    );
  }
}
export default logingOutPage;
