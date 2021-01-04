import React, { Component } from "react";
import Loading from "./loading";
import "../App.css";

import axios from "axios";
class loadingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
    };
  }

  async handledone() {
        axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_END}/businesses`,
      data: this.props.location.data,
      }).then((res) => {
           setTimeout(() => {
          this.setState({ load:true})
          setTimeout(() =>{
                       this.props.history.push("/login");
          },800)
           }, 2000); 
      });

  }

  componentDidMount() {
    this.handledone();
  }
  render() {
    return (
      <div className="loading">
        <Loading loading={this.state.load} />
        <h3>Setting up your account </h3>
      </div>
    );
  }
}
export default loadingPage;
