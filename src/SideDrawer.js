import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "./images/logo.png";
import Rating from "@material-ui/lab/Rating";
import home from "./icons/home.svg";
import message from "./icons/message.svg";
import checkbox from "./icons/checkbox.svg";
import bag from "./icons/bag.svg";
import accelerate from "./icons/accelerate.svg";
import ventures from "./icons/ventures.svg";
import person from "./icons/person.svg";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter } from "react-router-dom";
import community from "./icons/community.svg";
import HomePage from "./pages/Home/HomePage";
import clsx from "clsx";
import {
  fetchVideos,
  fetchProfile,
} from "./storage/actions/postActions";
import { connect } from "react-redux";
import "./App.css";
import ChatShell from "./pages/chat/ChatShell";
import Ventures from "./pages/Ventures/Ventures";
import StartUpPage from "./pages/StartUp/StartUpPage";
import DealFlow from "./pages/DealFlow/DealFlow";
import Community from "./pages/Community/Community";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import Login from "./form/Login";
import logingLoad from "./form/logingLoad";
import loadingPage from "./form/loadingPage";
import Reset from "./form/Reset";
import Change from "./form/Change";
import logingOutPage from "./form/logingOutPage";
import SignUp from "./form/SignUp";
import SmallDevicesPage from "./form/SmallDevicesPage";
import CompanyDetails from "./form/CompanyDetails";
import ChatSocketServer from "./pages/chat/utils/chatSocketServer";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flex: 1,
    padding: 0,
    "@global": {
      "*": {
        "scrollbar-width": "thin",
      },
      "*::-webkit-scrollbar": {
        width: "10px",
        height: "10px",
      },
    },
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerlogo: {
    width: 220,
    // height: 90,
    position: "fixed",
    top: 15,
    left: 10,
  },
  drawerHeader: {
    display: "flex",
    height: 110,
    flexDirection: "column",
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    top: 0,
    position: "fixed",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flex: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  logo: {
    height: 25,
    width: 50,
    radius: 150,
  },
  icon: {
    height: 40,
    width: 50,
  },
  textcolor: {
    color: "#393C40",
    marginLeft: 30,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function Drawing() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [rating] = React.useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]?.rating
  );
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]
      ?._id;
    if (userId) {
      ChatSocketServer.establishSocketConnection(userId);
      // ChatSocketServer.getNotifications(userId);
      // ChatSocketServer.getNotifications(userId);
      // ChatSocketServer.receiveNotifications();
    }
  }, []);

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <div>
          <img alt="R" src={logo} className={classes.drawerlogo} />
        </div>

      </div>
      <List
        style={{
          overflow: "hidden",
          "&::WebkitScrollbar": {
            width: "19px",
          },
        }}
      >
        <ListItem
          component={Link}
          to={"/Home"}
          style={{ marginTop: 3, height: "13vh", backgoundColor: "#F93800" }}
          button
          key={1}
        >
          <img alt="R" src={home} className={classes.icon} />
          <ListItemText className={classes.textcolor} primary={"Home"} />
        </ListItem>
        <ListItem
          component={Link}
          to={"/Ventures"}
          style={{ height: "13vh" }}
          button
          key={8}
        >
          <img alt="R" src={ventures} className={classes.icon} />
          <ListItemText className={classes.textcolor} primary={"Ventures"} />
        </ListItem>
        <ListItem
          component={Link}
          to={"/startup"}
          style={{ height: "13vh" }}
          button
          key={2}
        >
          <img alt="R" src={checkbox} className={classes.icon} />
          <ListItemText className={classes.textcolor} primary={"Start Up"} />
        </ListItem>
        <ListItem
          component={Link}
          to={"/Community"}
          style={{ height: "13vh" }}
          button
          key={9}
        >
          <img alt="R" src={community} className={classes.icon} />
          <ListItemText className={classes.textcolor} primary={"Community"} />
        </ListItem>
        <ListItem
          component={Link}
          to={"/inbox"}
          style={{ height: "13vh" }}
          button
          key={5}
        >
          <img alt="R" src={message} className={classes.icon} />
          <ListItemText className={classes.textcolor} primary={"Chat"} />
        </ListItem>{" "}
        <ListItem
          component={Link}
          to={"/CompanyProfile"}
          style={{ height: "13vh" }}
          button
          key={7}
        >
          <img src={person} alt="R" className={classes.icon} />
          <ListItemText className={classes.textcolor} primary={"Profile"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

function Main() {
  const [value, setValue] = React.useState("");

  const handleClick = (event) => {
    setValue(event.target.value);
  };

  const classes = useStyles();
  return (
    <div className={classes.main}>
      <BrowserRouter>
        {window.location.pathname !== "/notavail" &&
          window.location.pathname !== "/fetchdata" &&
          window.location.pathname !== "/change" &&
          window.location.pathname !== "/reset" &&
          window.location.pathname !== "/loginout" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/" &&
          window.location.pathname !== "/details" &&
          window.location.pathname !== "/loading" && <Drawing />}

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: true,
          })}
        >
          <div className="mainapp">
            <Route path="/inbox" component={ChatShell} />
            <Route path={"/login"} component={Login} />
            <Route path={"/reset"} component={Reset} />
            <Route path={"/notavail"} component={SmallDevicesPage} />
            <Route path={"/change"} component={Change} />
            <Route path={"/fetchdata"} component={logingLoad} />
            <Route path={"/loading"} component={loadingPage} />
            <Route path={"/loginout"} component={logingOutPage} />
            <Route exact path={"/details"} component={CompanyDetails} />
            <Route exact path={"/"} component={SignUp} />
            <Route path="/CompanyProfile" component={CompanyProfile} />
            <Route path="/startup" component={StartUpPage} />
            <Route path="/Home" component={HomePage} />
            <Route
              path="/Ventures"
              render={(props) => <Ventures value={value} />}
            />
            <Route path="/Accelerate" component={DealFlow} />
            <Route path="/Community" component={Community} />
            <Route path="/DealFlow" component={DealFlow} />
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}
class SideDrawer extends React.Component {
  componentWillMount() {
    if (
      window.location.pathname !== "/notavail" &&
      window.location.pathname !== "/fetchdata" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/reset" &&

      window.location.pathname !== "/change" &&
      window.location.pathname !== "/details"
    ) {
      if (localStorage.getItem("token") === null) {
        window.open("login", "_self");
      }
      var current = parseInt(localStorage.getItem("current"));
      if (isNaN(current)) {
        var getList = JSON.parse(localStorage.getItem("posts"))?.posts;
        getList = getList.profile;
        getList = getList[0];
        var currentex = parseInt(getList.week);
        localStorage.setItem("current", currentex);
      }
      this.getData();
    }
  }

  getData = () => {
    this.props.fetchVideos();
    this.props.fetchProfile();
  };
  render() {
    return <Main />;
  }
}

SideDrawer.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired,
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  videos: state.posts.videos,
  profile: state.posts.profile,
});

export default connect(mapStateToProps, {
  fetchVideos,
  fetchProfile,
})(SideDrawer);
