import React, { Component } from "react";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import logo from "../images/logo.png";
import fingerPrint from "../icons/ic_fingerprint_24px.svg";

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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,

      password: null,
      error: false,
    };
  }
  componentDidMount() {
    localStorage.setItem("percent", 0);
    localStorage.setItem("Notes", false);
    localStorage.setItem("Task", false);
    localStorage.setItem("Videos", false);
    localStorage.setItem("taskdown", 0);
    localStorage.setItem("notedown", 0);
    localStorage.setItem("watched", 0);
  }
  handleClick = (e) => {
    e.preventDefault();
    const password = this.state.password;
    const email = this.state.email;
    const user = { email: email, password: password };
    localStorage.setItem("email", email);
    var fd = new FormData();
    fd.append("email", email);
    fd.append("password", password);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_END}/auth`,
      data: user,
    })
      .then((res) => {
        localStorage.setItem("token", res.data);

        this.props.history.push({
          pathname: "/fetchdata",
          token: res.data,
        });
      })
      .catch((e) => {
        console.log("error");
        this.setState({ error: true });
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
        <img src={logo} className="logo" />

        <div className={"roots"} variant="outlined">
          <img alt="R" src={fingerPrint} className="image" />
          <h3 className="logintext">Login</h3>
          <div className="loginemail">
            <TextField
              placeholder=""
              label="Username"
              name="email"
              onChange={this.handleChange}
              margin="normal"
            />
          </div>
          <div className="loginpassword">
            <TextField
              placeholder=""
              type="password"
              label="Password"
              onChange={this.handleChange}
              margin="normal"
              name="password"
            />
            {this.state.error && (
              <span className="errorMessages">
                Invalid email or password. Try again or click Forgot password to
                reset it.
              </span>
            )}
          </div>

          <CardActions className="log">
            <StyledButton size="medium" onClick={this.handleClick}>
              login
            </StyledButton>
          </CardActions>
          <CardActions className="forgotPass">
            <a href="reset" style={{ color: "#707070" }}>
              Forgot Password?
            </a>
          </CardActions>
        </div>
      </div>
    );
  }
}
export default Login;
