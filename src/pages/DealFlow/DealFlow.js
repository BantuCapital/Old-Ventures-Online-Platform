import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./page.css";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import MessageIcon from "@material-ui/icons/Message";
import Badge from "../chat/notificationBadge";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    left: "4vw",
    top: "7vh",
    width: "70%",
    minHeight: "60vh",
    maxHeight: "60vh",
    overflow: "hidden",
  },
}));

export default function DealFlow() {
  const classes = useStyles();

  const { avatarUrl } = JSON.parse(
    localStorage.getItem("posts")
  )?.posts?.profile[0];
  return (
    <div className="deal">
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
      <Card className={classes.root}>
        <CardContent>
          <div className="rate">
            <div style={{ width: "64%" }}></div>
            <div className="right">
              <Typography
                style={{
                  "font-size": "3.2vw",
                  position: "absolute",
                  marginRight: "0.3%",
                }}
              >
                Coming Soon
              </Typography>
              <div className="bottom">
                <div className="rate">
                  <Checkbox
                    value="checkedC"
                    size="small"
                    style={{ left: "3vw" }}
                    inputProps={{ "aria-label": "Checkbox C" }}
                  />
                  <Typography
                    style={{
                      "font-size": "1vw",
                      paddingLeft: "3vw",
                      "text-align": "left",
                      marginTop: "7px",
                    }}
                  >
                    Let me know when it is ready
                  </Typography>
                </div>
                <Button style={{ width: "7vw", left: "12vw" }}>Send</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
