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
var formValid = (formErrors, rest) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
class Change extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: null,
      password: null,
      cpassword: null,
      email: props.location.email,
      formErrors: {
        password: "",
        cpassword: "",
      },
    };
  }
  componentDidMount() {
    console.log(this.state.email);
  }
  handleClick = (e) => {
    e.preventDefault();
    const password = this.state.password;
    const user = {
      secretCode: this.state.code,
      newPassword: password,
      confirmPassword: password,
    };
    var form = [
      this.state.code,
      this.state.email,
      this.state.password,
      this.state.cpassword,
    ];
    if (formValid(this.state.formErrors, form)) {
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_END}/reset`,
        data: user,
      })
        .then((res) => {
          this.props.history.push("/login");
        })
        .catch((e) => {
          console.log("error");
        });
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "password":
        formErrors.password =
          value.length < 8 ? "minimum 8 characaters required" : "";

        break;

      case "cpassword":
        formErrors.cpassword =
          this.state.password === value ? "" : "Password doesn't match";

        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };
  render() {
    const { formErrors } = this.state;

    return (
      <div className="wraps">
        <img src={logo} className="logo" />

        <div className={"changeroots"} variant="outlined">
          <div className="code">
            <TextField
              placeholder=""
              label="Secret Code"
              name="code"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="placeincol">
            <TextField
              placeholder=""
              label="New Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          <div className="placeCon">
            <TextField
              placeholder=""
              name="cpassword"
              type="password"
              label="Confirm Password"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            {formErrors.cpassword.length > 0 && (
              <span className="errorMessage">{formErrors.cpassword}</span>
            )}
          </div>
          <CardActions className="change">
            <StyledButton size="medium" onClick={this.handleClick}>
              Submit{" "}
            </StyledButton>
          </CardActions>
        </div>
      </div>
    );
  }
}
export default Change;
