import React, { useState, useRef, useCallback } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GridList from "@material-ui/core/GridList";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import "./Home.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fetchProfile } from "../../storage/actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import CustomBadge from "../chat/notificationBadge";
import Badge from "@material-ui/core/Badge";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import NotificationsDiv from "../chat/notifications";
import axios from "axios";

function youtubeLinkParser(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
}

function BoardHeader() {
  return (
    <div className="ventureheader">
      <p style={{ fontSize: "26px", height: 3, paddingLeft: 20 }}>
        Venture Board
      </p>
      <Divider />
    </div>
  );
}
function BoardList(props) {
  const [query, setQuery] = useState("all");
  console.log(props.query);
  const [pageNumber, setPageNumber] = useState(0);
  const { businesses, hasMore, loading, error } = useFetch(query, pageNumber);
  const observer = useRef();
  const lastBusinesseslementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div className="notificationlist">
      <GridList
        cellHeight={"auto"}
        style={{ overflow: "scroll", width: "100%" }}
        cols={3}
      >
        {businesses.map(
          ({ businessName, businessDescription, _id, avatarUrl }) => (
            <ListItem
              style={{ width: "32%", marginLeft: 10 }}
              component={Link}
              to={{ pathname: `/Ventures/${_id}`, data: businesses }}
              button
              key={_id}
            >
              <Avatar src={avatarUrl} alt="R" />
              <ListItemText
                style={{ marginLeft: 5 }}
                primary={businessName}
                secondary={businessDescription}
              />
              <Badge badgeContent={0} max={9} color="primary">
                <FavoriteIcon />
              </Badge>
            </ListItem>
          )
        )}
      </GridList>
    </div>
  );
}
function VentureBoard(props) {
  return (
    <div className="ventureboard">
      <BoardHeader />
      <BoardList query={props.query} />
    </div>
  );
}
function Content(props) {
  return (
    <div className="broot">
      <CardHeader title="Continue Your Journey" />
      <Link to={`/Startup/${props.state.current}`}>
        <img
          style={{ height: "35vh", marginLeft: "10%", width: "75%" }}
          src={props.state.image}
          alt="R"
        />
      </Link>
      <div className="row">
        <Typography
          style={{ paddingLeft: 20, paddingTop: 4, "font-size": "16px" }}
        >
          {props.state.focus}
        </Typography>
        <div className="newcol">
          <Typography style={{ paddingTop: 4, "font-size": "16px" }}>
            {props.state.current} of 24{" "}
          </Typography>
        </div>
      </div>
    </div>
  );
}
// function DealFlow(props) {
//   return (
//     <div className="Deal">
//       <div className="dealflowheader">
//         <Typography className="headerfont" style={{ "font-size": "23px" }}>
//           {" "}
//           From DealFlow{" "}
//         </Typography>
//       </div>
//     </div>
//   );
// }
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clearList: false,
      image: null,
      current: null,
      query: "all",
      focus: null,
      notificationlist: [],
    };
  }

  componentWillMount() {
    this.setState({ list: this.props.posts });

    var getList = JSON.parse(localStorage.getItem("posts"))?.posts;
    var current = JSON.parse(localStorage.getItem("current"));
    var watched = JSON.parse(localStorage.getItem("watched"));

    getList = getList.videos;
    var material = getList.find(({ Week }) => Week === current);
    this.setState({ current: current, focus: material.Focus });

    var extract = material.Videos;
    var images = extract.map((x) => youtubeLinkParser(x));
    images = images.map((x) => `https://img.youtube.com/vi/${x}/0.jpg`);
    this.setState({ image: images[watched] });
  }
  handleSearch = (e) => {
    const { value } = e.target;
    if (value === "") this.setState({ query: "all" });
    else this.setState({ query: value });
  };

  render() {
    const { classes } = this.props;
    const state = this.state;
    const notifications = state.notificationlist;
    const handleClear = (bool) => {
      this.setState({ clearList: bool });
    };
    //start of venture board

    function BoardHeader() {
      return (
        <div className="ventureheader">
          <p style={{ fontSize: "26px", height: 3, paddingLeft: 20 }}>
            Venture Board
          </p>
          <Divider />
        </div>
      );
    }
    function BoardList(props) {
      const [query, setQuery] = useState(state.query);
      const [pageNumber, setPageNumber] = useState(0);
      const { businesses, hasMore, loading, error } = useFetch(
        query,
        pageNumber
      );
      const observer = useRef();
      const lastBusinesseslementRef = useCallback(
        (node) => {
          if (loading) return;
          if (observer.current) observer.current.disconnect();
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
              setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
          });
          if (node) observer.current.observe(node);
        },
        [loading, hasMore]
      );
      return (
        <div className="notificationlist">
          <GridList
            cellHeight={"auto"}
            style={{ overflow: "scroll", width: "100%" }}
            cols={3}
          >
            {businesses.map(
              ({ businessName, businessDescription, _id, avatarUrl }) => (
                <ListItem
                  style={{ width: "32%", marginLeft: 10 }}
                  component={Link}
                  to={{ pathname: `/Ventures/${_id}`, data: businesses }}
                  button
                  key={_id}
                >
                  <Avatar src={avatarUrl} alt="R" />
                  <ListItemText
                    style={{ marginLeft: 5 }}
                    primary={businessName}
                    secondary={businessDescription}
                  />
                  <Badge badgeContent={0} max={9} color="primary">
                    <FavoriteIcon />
                  </Badge>
                </ListItem>
              )
            )}
          </GridList>
        </div>
      );
    }
    function VentureBoard(props) {
      return (
        <div className="ventureboard">
          <BoardHeader />
          <BoardList />
        </div>
      );
    }
    //end
    function NotifHeader() {
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      return (
        <div className="notifheader">
          <div style={{ width: "84%" }}>
            <CardHeader title="Notifications" />
          </div>
          <div>
            <IconButton
              style={{ top: 10 }}
              aria-label="settings"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClear(true)}>Clear</MenuItem>
            </Menu>
          </div>
        </div>
      );
    }

    function Notificationlist() {
      return (
        <div className="notificationlist">
          <NotificationsDiv />
        </div>
      );
    }
    function Notifications() {
      return (
        <div className="notificationcontainer">
          <NotifHeader />
          <NotificationsDiv
            clearList={state.clearList}
            handleClear={handleClear}
          />
        </div>
      );
    }

    const { avatarUrl } = JSON.parse(
      localStorage.getItem("posts")
    )?.posts?.profile[0];

    return (
      <div className="flow">
        <div style={{ height: 122, width: "100%" }} className="reverse">
          <div style={{ paddingLeft: "18%", width: "62%" }}>
            <input
              placeholder="Search"
              type="text"
              className="search"
              onChange={this.handleSearch}
              name="search"
              noValidate
            />
          </div>
          <div className="badge">
            <Link to="/inbox">
              <CustomBadge />
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
        <div className="row">
          {/* <DealFlow /> */}
          <Content state={this.state} />
          <Notifications />
        </div>
        <VentureBoard query={this.state.query} />
      </div>
    );
  }
}

HomePage.propTypes = {
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.posts.profile,
});

export default connect(mapStateToProps, { fetchProfile })(HomePage);
