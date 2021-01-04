import React, { useState, useRef, useCallback } from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import "./venture.css";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Switch, Route, Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import { fetchPosts } from "../../storage/actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import About from "./About";
import { withStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import Badge from "../chat/notificationBadge";
import ChatSocketServer from "../chat/utils/chatSocketServer";
import Hidden from "@material-ui/core/Hidden";
import clsx from "clsx";
import useFetch from '../Home/useFetch';
import Loading from "../../form/loading";
import GridListTile from "@material-ui/core/GridListTile";

const classes = makeStyles((theme) => ({
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
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

const useStyles = makeStyles({
  root: {
    position: "relative",
    left: 20,

    width: "70%",
    marginRight: 40,
    marginBottom: 40,
    overflow: "hidden",
    height: "27vh",
  },
});

const Filtercard = (e) => {
  return (
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: true,
      })}
    >
      <div class="filtercard">
        <p style={{ "text-align": "center" }}>Sort by</p>
        <Grid container>
          <Grid class="filtertext" item xs={6}>
            <Typography style={{ "font-size": "1.0em" }}>Industry</Typography>
            <Typography style={{ "font-size": "1.0em", marginTop: "15px" }}>
              Rating
            </Typography>
            <Typography style={{ "font-size": "1.0em", marginTop: "15px" }}>
              Age in Business
            </Typography>
          </Grid>
          <Grid class="checkicon" item xs={1}>
            <Checkbox
              value="checkedC"
              size="small"
              inputProps={{ "aria-label": "Checkbox C" }}
            />
            <Checkbox
              value="checkedC"
              size="small"
              inputProps={{ "aria-label": "Checkbox C" }}
            />
            <Checkbox
              value="checkedC"
              size="small"
              inputProps={{ "aria-label": "Checkbox C" }}
            />
          </Grid>
        </Grid>
      </div>
      <Typography style={{ color: "transparent" }}>
        hSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
      </Typography>
    </div>
  );
};
function LoadingRateCard(props){
  return(
     <div className="cover">
       <div class="aboutcard">
          <div class="aboutheader">
          
            <div class="rowtop">
              <p
                style={{
                  "font-size": "25px",
                  paddingLeft: 13,
                  paddingTop: 0,
                  height: 2,
                }}
              >
                {" "}
                fetching...
              </p>
              <a>
                <ChatIcon style={{ marginTop: "35px", paddingLeft: 10 }} />
              </a>
            </div>
            <p
              style={{
                "font-size": "15px",
                paddingLeft: 13,
                height: 0,
                width: "100%",
              }}
            >
                fetching...
            </p>
            <p style={{ "font-size": "14px", height: 6,paddingTop:20 ,paddingLeft: 13 }}>
              {" "}
              Stage: Week fetching...|
                              fetching...
            </p>
            <Rating
              precision={0.5}
              style={{ paddingLeft: 13 }}
              name="size-medium"
              value={5}
              size="small"
              readOnly
            />
          </div>
          <div class="photo">
            <Avatar
              style={{ height: 95, width: 95, top: 34 }}
              src={'g'}
              alt={"R"}
            />
          </div>

          <div class="body">
            <GridList cellHeight={"auto"} style={{ overflow: "auto" }} cols={1}>
              <GridListTile key={1}>
              
                  <Loading loading={false}/>
              </GridListTile>

              <GridListTile>
                <Typography
                  style={{
                    width: "80%",
                    height: "1vh",
                    "font-size": "15px",
                    marginBottom: 10,
                  }}
                ></Typography>
              </GridListTile>
            </GridList>
          </div>
          <div class="button">
           
              <StyledButton color="secondary" size="medium">
                Submit
              </StyledButton>
          </div>
        </div>
        <div>
          <Filtercard />
        </div>
    </div>

  )
}
function Startups(props) {
    
    const [industry, setindustry] = React.useState(false);
    const [rating, setrating] = React.useState(false);
    const [age, setage] = React.useState(false);
    console.log(props)
  const handleIndustryClick = (e)=> {
    setindustry(!industry)
    if(!industry)
      props.setQ("industry")
    else
       props.setQ('all')

  };
  const handleRateClick = (e)=> {
      setrating(!rating)
      if(!rating)
          props.setQ("rating")
      else
       props.setQ('all')


  };;const handleAgeClick = (e)=> {
     setage(!age)
     if(!age)
         props.setQ("age")
      else
       props.setQ('all')

    

  }; 
  const Filteringcard = (e) => {
    return (
      <div>
        <div class="filtercard">
          <p style={{ "text-align": "center" }}>Sort by</p>
          <Grid container>
            <Grid class="filtertext" item xs={6}>
              <Typography style={{ "font-size": "1.0em" }}>Industry</Typography>
              <Typography style={{ "font-size": "1.0em", marginTop: "15px" }}>
                Rating
              </Typography>
              <Typography style={{ "font-size": "1.0em", marginTop: "15px" }}>
                Age in Business
              </Typography>
            </Grid>
            <Grid class="checkicon" item xs={1}>
              <Checkbox
                value="checkedC"
                size="small"
                checked={industry}
                onChange={handleIndustryClick}
                inputProps={{ "aria-label": "Checkbox C" }}
              />
              <Checkbox
                value="checkedC"
                size="small"
                checked={rating}
                onChange={handleRateClick}
                inputProps={{ "aria-label": "Checkbox C" }}
              />
              <Checkbox
                value="checkedC"
                size="small"
                checked={age}
                  onChange={handleAgeClick}
                inputProps={{ "aria-label": "Checkbox C" }}
              />
            </Grid>
          </Grid>
        </div>
        <Typography style={{ color: "transparent" }}>
          hSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
        </Typography>
      </div>
    );
  };
  const classes = useStyles();
  return (
    <div className="cover">
      <div>
        <List>
          {props.data.map(
            ({
              businessName,
              businessDescription,
              businessIndustry,
              _id,
              week,
              avatarUrl,
              rating,
            }) => (
              <Link
                className={classes.root}
                style={{ textDecoration: "none" }}
                to={`/Ventures/${_id}`}
              >
                <div className="startupcard">
                  <Card>
                    <div className="rate">
                      <div style={{ width: "44vw" }}>
                        <CardContent style={{ paddingTop: 0 }}>
                          <p style={{ "font-size": "22px", height: 3 }}>
                            {businessName}
                          </p>
                          <p
                            style={{
                              "font-size": "15px",
                              height: 12,
                              paddingTop: 8,
                              width: "100%",
                            }}
                          >
                            {businessDescription}
                          </p>
                          <p style={{ "font-size": "14px", paddingTop: 17 }}>
                            {" "}
                            Stage: Week {week}|{businessIndustry}
                          </p>
                          <Rating
                            precision={0.5}
                            name="size-medium"
                            value={rating}
                            size="small"
                            readOnly
                          />
                        </CardContent>
                      </div>
                      <div className="end">
                        <Avatar
                          style={{ height: 100, width: 98, top: 30 }}
                          src={avatarUrl}
                          alt={"A"}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
            )
          )}
          <div class="space">
            <p></p>
          </div>
        </List>
      </div>
    <div>{props.loading && 
       <div className="startupcard">
                  <Card>
                    <div className="rate">
                      <div style={{ width: "44vw" }}>
                        <CardContent style={{ paddingTop: 0 }}>
                          <p style={{ "font-size": "22px", height: 3 }}>
                            

                                                      </p>
                          <p
                            style={{
                              "font-size": "15px",
                              height: 12,
                              paddingTop: 8,
                              width: "100%",
                            }}
                          >
                            fetching...
                          </p>
                          <p style={{ "font-size": "14px", paddingTop: 17 }}>
                            {" "}
                            Stage: fetching..|fetching..
                          </p>
                          <Rating
                            precision={0.5}
                            name="size-medium"
                            value={5}
                            size="small"
                            readOnly
                          />
                        </CardContent>
                      </div>
                      <div className="end">
                        <Avatar
                          style={{ height: 100, width: 98, top: 30 }}
                          src={"h"}
                          alt={"A"}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
    }</div>
       <div>{(props.data.length===0 && !props.loading) && 
       <div className="startupcard">
                  <Card>
                    <div className="rate">
                      <div style={{ width: "44vw" }}>
                        <CardContent style={{ paddingTop: 0 }}>
                         
                          <p
                            style={{
                              "font-size": "15px",
                              height: 12,
                              paddingTop: 8,
                              width: "100%",
                            }}
                          >
                            There is no businesses with that business name
                          </p>
                         
                       
                        </CardContent>
                      </div>
                      
                    </div>
                  </Card>
                </div>
    }</div>
      <div style={{ marginTop: 10 }}>
        <Filteringcard />
      </div>
    </div>
  );
}
/*
 Details about a Startup
*/

/* about version 2*/

var finalrating = 0;
function RateCard(props) {

  var item=props.item;
  const [first, setfirst] = React.useState(0);
  const [second, setsecond] = React.useState(0);
  const [third, setthird] = React.useState(0);
  const [forth, setforth] = React.useState(0);
  const [fifth, setfifth] = React.useState(0);
  const handleClick = (event) => {
    var total = first + second + third + forth + fifth;
    total = total * 0.2;
    total = total * 0.5;
    finalrating = total;
  };
  return (
    <div className="cover">
      <div class="aboutcard">
        <div class="aboutheader">
          <div class="rowtop">
            <p
              style={{
                "font-size": "25px",
                paddingLeft: 13,
                paddingTop: 0,
                height: 2,
              }}
            >
              {" "}
              {item.businessName}
            </p>
            <Link to="/inbox">
              <ChatIcon style={{ marginTop: "35px", paddingLeft: 10 }} />
            </Link>
          </div>
          <p
            style={{
              "font-size": "15px",
              paddingLeft: 13,
              height: 0,
              width: "95%",
            }}
          >
            {item.businessDescription}
          </p>
          <p style={{ "font-size": "14px",paddingTop:20 ,height: 6, paddingLeft: 13 }}>
            {" "}
            Stage: Week {item.week}|{item.businessIndustry}
          </p>
          <Rating
            style={{ paddingLeft: 13 }}
            precision={0.5}
            name="size-medium"
            value={item.rating}
            size="small"
            readOnly
          />
        </div>
        <div class="photo">
          <Avatar
            style={{ height: 95, width: 95, top: 34 }}
            src={item.avatarUrl}
            alt={"B"}
          />
        </div>
        <div class="body">
          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                paddingTop: 1,
                top: 0,
                width: "60%",
                paddingLeft: 16,
              }}
            >
              1. I am excited about this business
            </p>
            <Rating
              style={{ paddingTop: 15 }}
              name="no1"
              value={first}
              size="medium"
              precision={0.5}
              onChange={(event, newValue) => {
                setfirst(newValue);
              }}
            />
          </div>
          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                top: 0,
                width: "60%",
                paddingLeft: 16,
              }}
            >
              2. This business is innovative
            </p>
            <Rating
              style={{ paddingTop: 15 }}
              name="no2"
              value={second}
              precision={0.5}
              size="medium"
              onChange={(event, newValue) => {
                setsecond(newValue);
              }}
            />
          </div>
          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                top: 0,
                width: "60%",
                paddingLeft: 16,
              }}
            >
              3. I back this team
            </p>
            <Rating
              style={{ paddingTop: 15 }}
              name="no3"
              value={third}
              size="medium"
              precision={0.5}
              onChange={(event, newValue) => {
                setthird(newValue);
              }}
            />
          </div>

          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                top: 0,
                width: "60%",
                paddingLeft: 16,
              }}
            >
              4. I understand what this business does
            </p>
            <Rating
              style={{ paddingTop: 15 }}
              name="no4"
              value={forth}
              size="medium"
              precision={0.5}
              onChange={(event, newValue) => {
                setforth(newValue);
              }}
            />
          </div>
          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                top: 0,
                width: "60%",
                paddingLeft: 16,
              }}
            >
              5. I would work with this business / team
            </p>
            <Rating
              style={{ paddingTop: 15 }}
              name="no5"
              value={fifth}
              precision={0.5}
              size="medium"
              onChange={(event, newValue) => {
                setfifth(newValue);
              }}
            />
          </div>
        </div>
        <div class="submit">
          <Link
            style={{ textDecoration: "none" }}
            to={`/Ventures/overall/${item._id}`}
          >
            <StyledButton onClick={handleClick} size="medium">
              Submit
            </StyledButton>
          </Link>
        </div>
      </div>
      <div>
        <Filtercard />
      </div>
    </div>
  );
}
class Rate extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      item: null,
      loading:false
    };
  }
   componentWillMount() {
    console.log(this.props)
    var item=this.props.data.find( ({ _id }) => _id === this.props.match.params.id );
          this.setState({
      item:item

    });

    if(typeof item ==='undefined' || JSON.stringify(this.props.day)===JSON.stringify([]) ){
      this.setState({loading:true})
          console.log(typeof item)

      axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_END}/businesses/${this.props.match.params.id}`,
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => {
               console.log(res.data)

      this.setState({
      item:res.data,
      loading:false
    });
    });
  };


    
  }


render(){
  return (
    <div className="cover">
       {!this.state.loading &&
        <RateCard item={this.state.item} />
       }  
       {this.state.loading &&
        <LoadingRateCard />
       }
    </div>
  );
}
}
/*
   overall Rating
*/

function Overall(props) {
  const { businessName: userName, avatarUrl } = JSON.parse(
    localStorage.getItem("posts")
  )?.posts?.profile[0];

  var item = props.data.find(({ _id }) => _id === props.match.params.id);
  if(typeof item ==='undefined'){
            window.open("/ventures", "_self");     

  };

  const [value, setValue] = React.useState(0);
  const handleClick = (event) => {
    var overall = value * 0.5;
    finalrating = finalrating + overall;
    const rate = {
      businessName: item.businessName,
      rating: `${finalrating}`,
    };
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_END}/businesses/rate`,
      data: rate,
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res);
      ChatSocketServer.sendNotification({
        type: "RATING",
        rating: rate.rating,
        overallRating: res.data.rating,
        senderName: userName,
        receiverId: item._id,
        senderAvatarUrl: avatarUrl,
      });
    });
  };
  return (
    <div className="cover">
      <div class="overallcard">
        <div class="aboutheader">
          <div class="rowtop">
            <p
              style={{
                "font-size": "25px",
                paddingLeft: 13,
                paddingTop: 0,
                height: 2,
              }}
            >
              {" "}
              {item.businessName}
            </p>
            <Link to="/inbox">
              <ChatIcon style={{ marginTop: "35px", paddingLeft: 10 }} />
            </Link>
          </div>
          <p
            style={{
              "font-size": "15px",
              paddingLeft: 13,
              height: 0,
              width: "95%",
            }}
          >
            {item.businessDescription}
          </p>
          <p style={{ "font-size": "14px",paddingTop:20 , height: 6, paddingLeft: 13 }}>
            {" "}
            Stage: Week {item.week}|{item.businessIndustry}
          </p>
          <Rating
            style={{ paddingLeft: 13 }}
            name="size-medium"
            precision={0.5}
            value={item.rating}
            size="small"
            readOnly
          />
        </div>
        <div class="photo">
          <Avatar
            style={{ height: 95, width: 95, top: 34 }}
            src={item.avatarUrl}
            alt={"R"}
          />
        </div>
        <div class="body">
          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                paddingTop: 4,
                paddingLeft: 18,
                width: "75%",
              }}
            >
              Thank you for rating this business, please rate the overall
              business.
            </p>
          </div>
          <div className="rate">
            <p
              style={{
                "font-size": "15px",
                paddingLeft: 18,
                top: 0,
                width: "40%",
              }}
            >
              Overall rating
            </p>
            <Rating
              style={{ paddingTop: 15 }}
              name="size-medium"
              value={value}
              precision={0.5}
              size="medium"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        </div>
        <div class="submit">
          <Link style={{ textDecoration: "none" }} to={`/Ventures`}>
            <StyledButton onClick={handleClick} size="medium">
              Submit
            </StyledButton>
          </Link>
        </div>
      </div>
      <div>
        <Filtercard />
      </div>
    </div>
  );
}
function Ventures(props) {
    const [query, setQuery] = useState('all')
   const [empty, setEmpty] = React.useState(true);
    const [pageNumber, setPageNumber] = useState(0)
     const {
    businesses,
    hasMore,
    loading,
    error
  } = useFetch(query, pageNumber)
    const observer = useRef()
  const handleSearch  = (e) =>{
    const { value } = e.target;
    console.log(value.length)
    if(value==='')
      setQuery('all')
    else
      setQuery(value)
  }
  const lastBusinessesElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

    const { avatarUrl } = JSON.parse(
      localStorage.getItem("posts")
    )?.posts?.profile[0];
    return (
      <div>
        <div style={{ height: 122, width: "100%" }} className="reversev">
          <div style={{ paddingLeft: "18%", width: "62%" }}>
            <input
              placeholder="Search"
              type="text"
              className="search"
              onChange={handleSearch}
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
        <div className="cover">
          <div className="flows">
            <Switch>
              <Route
                exact
                path="/Ventures"
                render={(props) => (
                  <Startups {...props} data={businesses} setQ={setQuery} loading={loading} empty={empty}/>
                )}
              />
              <Route
                exact
                path="/Ventures/:id"
                render={(props) => <About {...props} data={businesses} />}
              />
              <Route
                exact
                path="/Ventures/Rate/:id"
                render={(props) => <Rate {...props} data={businesses} />}
              />
              <Route
                path="/ventures/overall/:id"
                render={(props) => (
                  <Overall {...props} data={businesses} />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }


export default Ventures;
