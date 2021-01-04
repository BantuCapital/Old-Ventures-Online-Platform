import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./company.css";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import axios from "axios";
import MessageIcon from "@material-ui/icons/Message";
import Badge from "../chat/notificationBadge";
import { Link } from "react-router-dom";

const styles = {
  input1: {
    height: 50,
  },
  vision: {
    minHeight: "10vh",
    maxHeight: "10vh",
    overflow: "auto",
    fontSize: "0.9em",
  },
  about: {
    minHeight: "27vh",
    maxHeight: "27vh",
    overflow: "auto",
    fontSize: "1em",
  },
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

function UpdateVision(body) {
  var input = {
    value: body,
  };
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_END}/businesses/Update/businessVision`,
    data: input,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((res) => console.log(res.data));
}
function UpdateMission(body) {
  var input = {
    value: body,
  };
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_END}/businesses/Update/businessMission`,
    data: input,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((res) => console.log(res.data));
}
function UpdateAbout(body) {
  var input = {
    value: body,
  };
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_END}/businesses/Update/aboutBusiness`,
    data: input,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((res) => console.log(res.data));
}
function UpdateDescription(body) {
  var input = {
    value: body,
  };
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_END}/businesses/Update/businessDescription`,
    data: input,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((res) => console.log(res.data));
}
function Profile(props) {
  return (
    <div>
      {!props.edit && <Entrepreneurs props={props} />}
      {props.edit && <AddFounder props={props} />}
    </div>
  );
}
function AddFounder(props) {
  const [first, setfirst] = React.useState("");
  const [last, setlast] = React.useState("");
  const [role, setrole] = React.useState("");
  const [about, setabout] = React.useState("");
  const [email, setemail] = React.useState("");
  const [file, setFile] = React.useState();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "first":
        setfirst(event.target.value);
        break;
      case "last":
        setlast(event.target.value);
        break;
      case "role":
        setrole(event.target.value);
        break;
      case "about":
        setabout(event.target.value);
        break;
      case "email":
        setemail(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleClick = () => {
    const data = {
      firstName: first,
      lastName: last,
      email: email,
      role: role,
      aboutFounder: about,
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    fd.append("file", file);
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_END}/businesses/`,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div id="profile">
      <p
        style={{ "font-size": "18px", "font-weight": "bold", paddingLeft: 13 }}
      >
        Company Structure
      </p>
      <p style={{ "font-size": "18px", paddingLeft: 13 }}>First Name:</p>
      <div class="vision">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          fullWidth
          name="first"
          variant="outlined"
        />
        <p style={{ "font-size": "18px", paddingLeft: 3 }}>Last Name:</p>
      </div>
      <div class="vision">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          fullWidth
          name="last"
          variant="outlined"
        />
        <p style={{ "font-size": "18px", paddingLeft: 3 }}>Email:</p>
      </div>
      <div class="vision">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          fullWidth
          name="email"
          variant="outlined"
        />
        <p style={{ "font-size": "18px", paddingLeft: 3 }}>Role:</p>
      </div>
      <div class="vision">
        <TextField
          id="role"
          name="role"
          fullWidth
          multiline
          variant="outlined"
          rows={10}
          onChange={handleChange}
          InputProps={{
            classes: { input: props.props.classes.vision },
            readOnly: false,
            disableUnderline: true,
          }}
        />
      </div>
      <p style={{ "font-size": "18px", paddingLeft: 15 }}>About:</p>

      <div class="vision">
        <TextField
          id="role"
          name="about"
          fullWidth
          multiline
          onChange={handleChange}
          variant="outlined"
          rows={10}
          InputProps={{
            classes: { input: props.props.classes.vision },
            readOnly: false,
            disableUnderline: true,
          }}
        />
      </div>
      <p style={{ "font-size": "16px", paddingLeft: 13 }}>Profile Picture: </p>
      <div className="vision">
        <input
          type="file"
          accept="image/*"
          className="custom-file-input"
          id="customFile"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="addspace">
        <StyledButton onClick={handleClick} size="medium">
          Add Founder
        </StyledButton>
      </div>
    </div>
  );
}
function Entrepreneurs(props) {
  return (
    <div>
      <div id="profile">
        <p
          style={{
            "font-size": "18px",
            "font-weight": "bold",
            paddingLeft: 13,
          }}
        >
          Company Structure
        </p>
        <p style={{ "font-size": "18px", paddingLeft: 14 }}>Entrepreneurs</p>

        {props.props.founders.map(({ firstName, aboutFounder, avatarUrl }) => (
          <ListItem style={{ marginTop: 60 }}>
            <div className="founder">
              <div className="pnn">
                <Avatar
                  style={{ height: 105, width: 103, top: 15, marginLeft: 1 }}
                  src={avatarUrl}
                  alt={"A"}
                />
                <p style={{ "text-align": "center", "font-size": "16px" }}>
                  {firstName}{" "}
                </p>
              </div>
              <Typography
                style={{ "font-size": "13px", marginTop: 32, paddingLeft: 11 }}
              >
                {aboutFounder}
              </Typography>
            </div>
          </ListItem>
        ))}
      </div>
    </div>
  );
}
class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      vision: null,
      mission: null,
      name: null,
      about: null,
      bio: null,
      founders: [],
      prop: this.props,
      anchorEl: null,
    };
  }
  handleDescription = (e) => {
    UpdateVision(this.state.vision);
    UpdateMission(this.state.mission);
    UpdateAbout(this.state.about);
  };
  handleBio = (e) => {
    UpdateDescription(this.state.bio);
  };
  componentWillMount() {
    var getList = JSON.parse(localStorage.getItem("posts"))?.posts;
    getList = getList.profile;
    getList = getList[0];

    this.setState({
      founders: getList.businessFounders,
      name: getList.businessName,
      bio: getList.businessDescription,
      vision: getList.businessVision,
      mission: getList.businessMission,
      about: getList.aboutBusiness,
    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    this.setState({ [name]: value });
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleCancel = () => {
    this.setState({ edit: false, anchorEl: null });
  };
  handleEdit = () => {
    this.setState({ edit: true, anchorEl: null });
  };

  render() {
    const state = this.state;
    var outliner = state.edit ? "outlined" : "standard";
    const { anchorEl } = this.state;

    const { avatarUrl } = JSON.parse(
      localStorage.getItem("posts")
    )?.posts?.profile[0];

    return (
      <div className="prof">
        <div style={{ height: 122, width: "100%" }} className="reverse">
          <div style={{ paddingLeft: "18%", width: "62%" }}>
            <input
              placeholder="Search"
              type="text"
              className="search"
              name="search"
              noValidate
            />
          </div>
          <div className="badge">
            <Link to="/inbox">
              <Badge />
            </Link>
            <div>
              <Avatar
                style={{ height: 50, width: 50, top: 10, left: 92, right: 2 }}
                src={avatarUrl}
                alt={"R"}
              />
              <div className="rate">
                <a
                  href="CompanyProfile"
                  style={{
                    fontSize: "13px",
                    marginTop: 10,
                    height: 1,
                    paddingLeft: 70,
                  }}
                >
                  Profile{" "}
                </a>
                <p style={{ fontSize: "13px", height: 1, paddingLeft: 5 }}>|</p>
                <a
                  href="loginout"
                  style={{ fontSize: "13px", marginTop: 10, paddingLeft: 5 }}
                >
                  {" "}
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="full">
          <div id="description">
            <p
              style={{
                "font-size": "18px",
                "font-weight": "bold",
                paddingLeft: 13,
              }}
            >
              Company Description
            </p>
            <p style={{ "font-size": "18px", paddingLeft: 13 }}>Vision</p>
            <div class="vision">
              <TextField
                id="Mision"
                name="vision"
                fullWidth
                multiline
                rows={10}
                variant={outliner}
                onChange={this.handleChange}
                value={state.vision}
                InputProps={{
                  classes: { input: state.prop.classes.vision },
                  readOnly: !state.edit,
                  disableUnderline: true,
                }}
              />
            </div>
            <p style={{ "font-size": "18px", paddingLeft: 13 }}>Mission</p>
            <div class="vision">
              <TextField
                id="Mision"
                name="mission"
                fullWidth
                multiline
                variant={outliner}
                rows={10}
                onChange={this.handleChange}
                value={state.mission}
                InputProps={{
                  classes: { input: state.prop.classes.vision },
                  readOnly: !state.edit,
                  disableUnderline: true,
                }}
              />
            </div>
            <p style={{ "font-size": "18px", paddingLeft: 13 }}>About</p>
            <div class="about">
              <TextField
                id="about"
                multiline
                fullWidth
                name="about"
                onChange={this.handleChange}
                value={state.about}
                rows={10}
                variant={outliner}
                InputProps={{
                  classes: { input: state.prop.classes.about },
                  readOnly: !state.edit,
                  disableUnderline: true,
                }}
              />
            </div>
            <div class="addspace">
              {state.edit && (
                <StyledButton onClick={this.handleDescription} size="medium">
                  Update
                </StyledButton>
              )}
            </div>
          </div>
          <div id="structure">
            <div class="edit">
              <IconButton
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                <MenuItem onClick={this.handleCancel}>Cancel</MenuItem>
              </Menu>
            </div>
            <div class="namephoto">
              <Avatar src={avatarUrl} style={{ height: 140, width: 140 }}>
                RG
              </Avatar>
              <p class="name">{state.name}</p>
            </div>
            <p style={{ "font-size": "18px", paddingLeft: 13 }}>Bio</p>
            <div class="bio">
              <TextField
                id="vision"
                multiline
                fullWidth
                name="bio"
                onChange={this.handleChange}
                defaultValue={state.bio}
                InputProps={{
                  classes: { input: state.prop.classes.vision },
                  readOnly: !state.edit,
                  disableUnderline: true,
                }}
                variant={outliner}
              />
            </div>
            <p style={{ "font-size": "18px", paddingLeft: 13 }}>Address</p>
            <div class="vision">
              <TextField
                id="vision"
                multiline
                fullWidth
                InputProps={{
                  classes: { input: state.prop.classes.vision },
                  readOnly: !state.edit,
                  disableUnderline: true,
                }}
                variant={outliner}
              />
            </div>
            <div class="addspace">
              {state.edit && (
                < StyledButton onClick={this.handleBio} size="medium">
                  Update
                </StyledButton >
              )}
            </div>
          </div>
          <Profile
            {...state.prop}
            founders={this.state.founders}
            edit={state.edit}
          />
        </div>
      </div>
    );
  }
}
const StyledCompanyProfile = withStyles(styles)(CompanyProfile);

export default StyledCompanyProfile;
