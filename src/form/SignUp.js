import React, { Component } from "react";
import "./signup.css";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import logo from "../images/logo.png";
import fingerPrint from "../icons/ic_fingerprint_24px.svg";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
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
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: null,
      email: null,
      password: null,
      cpassword: null,

      formErrors: {
        fullname: "",
        email: "",
        password: "",
        cpassword: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const details = {
      businessName: this.state.fullName,
      businessEmail: this.state.email,
      password: this.state.password,
    };
    var form = [
      this.state.fullname,
      this.state.email,
      this.state.password,
      this.state.cpassword,
    ];
    if (formValid(this.state.formErrors, form)) {
      this.props.history.push({ pathname: "/details", details: details });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "fullName":
        formErrors.fullname =
          value.length < 3 ? "minimum 3 characaters required" : "";

        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";

        break;

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
      <div className="wrap">
        <img src={logo} className="logo" />

        <div className={"root"} variant="outlined">
          <img alt="R" src={fingerPrint} className="image" />
          <h3 className="logintext">Register</h3>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="username">
              <TextField
                type="text"
                className={formErrors.fullname.length > 0 ? "error" : null}
                label="Business Name"
                name="fullName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.fullname.length > 0 && (
                <span className="errorMessage">{formErrors.fullname}</span>
              )}
            </div>
            <div className="useremail">
              <TextField
                type="text"
                className={formErrors.email.length > 0 ? "error" : null}
                label="Email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="userpassword">
              <TextField
                className={formErrors.password.length > 0 ? "error" : null}
                label="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="userconpassword">
              <TextField
                className={formErrors.cpassword.length > 0 ? "error" : null}
                label="Confirm Password "
                type="password"
                name="cpassword"
                onChange={this.handleChange}
              />
              {formErrors.cpassword.length > 0 && (
                <span className="errorMessage">{formErrors.cpassword}</span>
              )}
            </div>
            <CardActions className="reg">
              <StyledButton type="submit">Register</StyledButton>
            </CardActions>
          </form>

          <CardActions className="already">
            <a href={"login"} style={{ color: "#707070" }}>
              Already have an account?
            </a>
          </CardActions>
        </div>
      </div>
    );
  }
}
export default Signup;
