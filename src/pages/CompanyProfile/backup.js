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

export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      vision: null,
      mission: null,
      name: null,
      about: null,
      bio: null,
    };
  }
  componentWillMount() {
    var getList = JSON.parse(localStorage.getItem("posts")).posts;
    getList = getList.profile;
    getList = getList[0];
    this.setState({
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
  render() {
    const state = this.state;
    const edit = state.edit;
    const handle = this.handleChange;
    const handleEdit = (e) => {
      this.setState({ edit: true });
    };
    const handleClose = (e) => {
      this.setState({ edit: false });
      console.log(edit);
    };
    const handleFocus = (e) => {
      console.log(e);
    };

    function CompanyDescription(props) {
      var outliner = edit ? "outlined" : "standard";

      return (
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
              id="vision"
              name="vision"
              multiline
              fullWidth
              rows={4}
              value={state.vision}
              onChange={handle}
              InputProps={{
                classes: { input: props.classes.vision },
                readOnly: !edit,
                disableUnderline: true,
              }}
              variant={outliner}
            />
          </div>
          <p style={{ "font-size": "18px", paddingLeft: 13 }}>Mission</p>
          <div class="vision">
            <TextField
              id="Mision"
              fullWidth
              multiline
              defaultValue={state.mission}
              InputProps={{
                classes: { input: props.classes.vision },
                readOnly: !edit,
                disableUnderline: true,
              }}
              variant={outliner}
            />
          </div>
          <p style={{ "font-size": "18px", paddingLeft: 13 }}>About</p>
          <div class="about">
            <TextField
              id="about"
              multiline
              fullWidth
              defaultValue={state.about}
              InputProps={{
                classes: { input: props.classes.about },
                readOnly: !edit,
                disableUnderline: true,
              }}
              variant={outliner}
            />
          </div>
          <div class="addspace">
            {edit && <Button size="medium">Update</Button>}
          </div>
        </div>
      );
    }

    function CompanyStructure(props) {
      var outliner = edit ? "outlined" : "standard";
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      return (
        <div id="structure">
          <div class="edit">
            <IconButton
              style={{ marginTop: 15 }}
              aria-label="settings"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
              </Menu>
            </IconButton>
          </div>
          <div class="namephoto">
            <Avatar style={{ height: 140, width: 140 }}>RG</Avatar>
            <p class="name">{state.name}</p>
          </div>
          <p style={{ "font-size": "18px", paddingLeft: 13 }}>Bio</p>
          <div class="bio">
            <TextField
              id="vision"
              multiline
              fullWidth
              defaultValue={state.bio}
              InputProps={{
                classes: { input: props.classes.vision },
                readOnly: !edit,
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
                classes: { input: props.classes.vision },
                readOnly: !edit,
                disableUnderline: true,
              }}
              variant={outliner}
            />
          </div>
          <div class="addspace">
            {edit && <Button size="medium">Update</Button>}
          </div>
        </div>
      );
    }
    function Profile() {
      return (
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
        </div>
      );
    }
    const StyledDescription = withStyles(styles)(CompanyDescription);
    const StyledStructure = withStyles(styles)(CompanyStructure);

    return (
      <div class="full">
        <StyledDescription />
        <StyledStructure />
        <Profile />
      </div>
    );
  }
}

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
      prop: this.props,
      anchorEl: null,
    };
  }
  componentWillMount() {
    var getList = JSON.parse(localStorage.getItem("posts")).posts;
    getList = getList.profile;
    getList = getList[0];
    console.log(this.state.prop);

    this.setState({
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
    console.log(event.currentTarget);
  };

  render() {
    const state = this.state;
    var outliner = state.edit ? "outlined" : "standard";
    const handleEdit = (e) => {
      this.setState({ edit: true });
    };
    const handleClose = (e) => {
      this.setState({ edit: false });
    };
    function Menu() {
      const [anchorEl, setAnchorEl] = React.useState(null);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      return (
        <IconButton
          style={{ marginTop: 15 }}
          aria-label="settings"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Cancel</MenuItem>
          </Menu>
        </IconButton>
      );
    }

    return (
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
          <p style={{ "font-size": "18px", paddingLeft: 13 }}>Mision</p>
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
              onChange={this.handleChange}
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
            {state.edit && <Button size="medium">Update</Button>}
          </div>
        </div>
        <div id="structure">
          <div class="edit"></div>
          <div class="namephoto">
            <Avatar style={{ height: 140, width: 140 }}>RG</Avatar>
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
            {state.edit && <Button size="medium">Update</Button>}
          </div>
        </div>
      </div>
    );
  }
}
const StyledCompanyProfile = withStyles(styles)(CompanyProfile);

export default StyledCompanyProfile;
