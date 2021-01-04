import React from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import "./venture.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GridListTile from "@material-ui/core/GridListTile";
import { Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loading from "../../form/loading";
import GridList from "@material-ui/core/GridList";

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

function Filtercard() {
  return (
    <div>
      <div class="filtercard">
        <p style={{ "text-align": "center" }}>Filter by</p>
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
}
function AboutCard(props){
  console.log(props)
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
                {props.item.businessName}
              </p>
              <a onClick={props.createChat}>
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
              {props.item.businessDescription}
            </p>
            <p style={{ "font-size": "14px", height: 6,paddingTop:20 ,paddingLeft: 13 }}>
              {" "}
              Stage: Week {props.item.week}|
              {props.item.businessIndustry}
            </p>
            <Rating
              precision={0.5}
              style={{ paddingLeft: 13 }}
              name="size-medium"
              value={props.item.rating}
              size="small"
              readOnly
            />
          </div>
          <div class="photo">
            <Avatar
              style={{ height: 95, width: 95, top: 34 }}
              src={props.item.avatarUrl}
              alt={"R"}
            />
          </div>

          <div class="body">
            <GridList cellHeight={"auto"} style={{ overflow: "auto" }} cols={1}>
              <GridListTile key={props.item._id}>
                <Typography
                  style={{
                    paddingLeft: 22,
                    width: "95%",
                    "font-size": "14px",
                    marginBottom: 10,
                  }}
                >
                  {props.item.aboutBusiness}
                </Typography>
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
            <Link
              style={{ textDecoration: "none" }}
              to={`/Ventures/Rate/${props.item._id}`}
            >
              <StyledButton color="secondary" size="medium">
                Rate Business
              </StyledButton>
            </Link>
          </div>
        </div>
        <div>
          <Filtercard />
        </div>
    </div>

  )
}
function LoadingAboutCard(props){
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
                Rate Business
              </StyledButton>
          </div>
        </div>
        <div>
          <Filtercard />
        </div>
    </div>

  )
}
class About extends React.Component {
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

  createChat = async () => {
    const { businessName, _id, avatarUrl } = this.state.item;
    this.props.history.push({
      pathname: "/inbox",
      selectedChatUser: {
        avatarUrl,
        businessId: _id,
        title: businessName,
        imageAlt: businessName,
        chatId: "",
        messages: [],
      },
    });
  };

  render() {
    return (
      <div className="cover">
       {!this.state.loading &&
        <AboutCard item={this.state.item} createChat={this.createChat} />
       }
        {this.state.loading &&
        <LoadingAboutCard/>
       }
      </div>
    );
  }
}



export default About;
