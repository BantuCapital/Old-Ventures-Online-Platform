import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import "./page.css";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MessageIcon from "@material-ui/icons/Message";
import Badge from "../chat/notificationBadge";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    left: "4vw",
    top: "6vh",
    width: "75%",
    maxHeight: "60vh",
    overflow: "hidden",
  },
}));

export default function Community() {
  const classes = useStyles();

  const { avatarUrl } = JSON.parse(
    localStorage.getItem("posts")
  )?.posts?.profile[0];
  return (
    <div className="dim">
      <div style={{ height: 122, width: "100%" }} className="reversecom">
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
      <Card className={classes.root}>
        <CardContent>
          <CardHeader title="Community" />
          <div className="rate">
            <div style={{ width: "60%" }}></div>
            <div className="center">
              <div style={{ height: "17vh" }}></div>
              <Typography style={{ "font-size": "18px" }} className="p">
                Be part of out responsive and interactive community join our
                Facebook group
              </Typography>
              <a
                target="_blank"
                style={{
                  "font-size": "19px",
                  marginTop: "15vh",
                  textDecoration: "none",
                  color: "#000000",
                }}
                className="end"
                href="https://www.facebook.com/groups/737212317072961/?ref=share"
              >
                Visit
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
