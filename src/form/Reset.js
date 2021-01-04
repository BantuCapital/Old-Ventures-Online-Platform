import React, { Component } from "react";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import logo from "../images/logo.png";

const StyledButton = withStyles({
  root: {
    background: "#F93800",
    borderRadius: 6,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    const email = this.state.email;

    const password = this.state.password;
    const user = { businessEmail: email };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_END}/reset`,
      data: user,
    })
      .then((res) => {
        console.log(res);
        this.props.history.push({ pathname: "/change", email: email });
      })
      .catch((e) => {
        console.log("error");
      });
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="wraps">
        <img src={logo} alt="V" className="logo" />

        <div className={"resetroots"} variant="outlined">
          <p>
            If you‘d like to reset your password, please enter your email here
            and a link to do so will be sent to the address you enter.
          </p>
          <div className="resetemail">
            <TextField
              placeholder=""
              label="Email"
              name="email"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </div>

          <CardActions className="log">
            <StyledButton size="medium" onClick={this.handleClick}>
              Reset{" "}
            </StyledButton>
          </CardActions>
        </div>
      </div>
    );
  }
}
export default Reset;
