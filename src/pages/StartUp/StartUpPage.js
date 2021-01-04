import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import { Switch, Route, Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import "./start.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import clsx from 'clsx';
import {
  Media,
  Player,
  controls,
} from "react-media-player";
import PlayPause from "./PlayPause";
import MuteUnmute from "./MuteUnmute";
import Fullscreen from "./Fullscreen";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { fetchVideos } from "../../storage/actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Badge from "../chat/notificationBadge";
import Avatar from "@material-ui/core/Avatar";

const { CurrentTime, SeekBar, Duration, Volume } = controls;
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    left: "4vw",
    top: "1vh",
    width: "92%",
    height: "80vh",
    overflow: "scroll",
  },
   expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  board: {
    position: "relative",
    top: "4vh",
    left: 20,
    width: "95%",
    minHeight: "15vh",
    maxHeight: "70vh",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const StyledButton = withStyles({
  root: {
    background: "rgba(249,76,0,0.7)",
    borderRadius: 6,
    border: 5,
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);
const StyledButtonpop = withStyles({
  root: {
    background: "white",
    borderRadius: 6,
    border: 5,
    color: "rgba(249,76,0)",
    height: 48,
    padding: "0 30px",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={63} variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
function UpdateWeek(Week) {
  var data = {
    week: Week,
  };
  localStorage.setItem('current',Week)
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_END}/businesses/updateWeek`,
    data: data,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((res) => console.log("done"));
}

function youtubeLinkParser(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null;
  }
}

function Downloads(props) {
  var Notes = props.data.Notes;
  var Task = props.data.Task;
  var Template = props.template? props.data.Template :"empty";
 
  return (
    <div class="Notes">
      <Grid container>

        <Grid class="notestext" item xs={6}>
         { props.show &&
          <Typography
            style={{
              "text-align": "center",
              fontSize: "1.0em",
              marginLeft: "70px",
              marginTop: "8px",
            }}
          >
            Notes
          </Typography>
        }
        { !props.show &&
          <Typography
            style={{
              "text-align": "center",
              fontSize: "1.0em",
              marginTop: "10px",
              marginLeft:"20px"
            }}
          >
             Weekly Task
          </Typography>
        }
       { props.show && (
          <Typography
            style={{
              "text-align": "center",
              fontSize: "1.0em",
              marginTop: "20px",
            }}
          >
           {props.showtask ? "Weekly Task":""}
          </Typography>
        
         )
        }
        { props.template &&
          <Typography
            style={{
              "text-align": "center",
              fontSize: "1.0em",
              marginTop: "22px",
              marginLeft:3
            }}
          >
            Template
          </Typography>
        }
        </Grid>
        <Grid item xs={1}>
          <div class="notesicon">
            { props.show &&
            <IconButton
              href={Notes}
              target="_blank"
            >
              <GetAppIcon />
            </IconButton>
            }
            { props.showtask &&
            <IconButton
              href={Task}
              target="_blank"
            >
              <GetAppIcon />
            </IconButton>
          } 
           {props.template &&
            <IconButton
              href={Template}
              target="_blank"
            >
              <GetAppIcon />
            </IconButton>
          }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

class ContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      thumbnail: [],
      videos: [],
      playing: 0,
      show:true,
      watched: false,
      template:false,
      showtask:true,
      downloads: [],
    };
  }

  componentWillMount() {
    var id = parseInt(this.props.match.params.id);
    var remove=[7,8,20,22];
    if(remove.includes(id)){
             this.setState({ show: false });

    }

    if(id===24){
                   this.setState({ showtask: false });

    } 
    if(id===16){
                   this.setState({ template: true });

    }
    var material = [];
    var extract = [];
    try {
      material = this.state.data.find(({ Week }) => Week === id);
      extract = material.Videos;
      this.setState({ videos: extract });
      this.setState({ downloads: material });
            try{
      var images = extract.map((x) => youtubeLinkParser(x));
      images = images.map((x) => `https://img.youtube.com/vi/${x}/0.jpg`);
      this.setState({ thumbnail: images });
    }
      catch(e){

      }
    } catch (e) {
      var getList = JSON.parse(localStorage.getItem("posts"))?.posts;
      getList = getList.videos;
      material = getList.find(({ Week }) => Week === id);
      extract = material.Videos;
      this.setState({ videos: extract });
      this.setState({ downloads: material });
      try{
      var images = extract.map((x) => youtubeLinkParser(x));
      images = images.map((x) => `https://img.youtube.com/vi/${x}/0.jpg`);
      localStorage.setItem("watched", 0);
      this.setState({ thumbnail: images });
    }
    catch(e){

    }
    }
  }

  handleClick = (value) => () => {
    var play = this.state.thumbnail.indexOf(value);
   
    this.setState({ playing: play });
  };
  render() {
    const avail=typeof this.state.videos==="undefined";
    return (
      <div class="startcontent">
        <div class="Contentcard">
          <Media>
            <div class="video">
              { !avail &&
              <div className={"media-player"} tabIndex="0">
                <Player
                  src= {this.state.videos[this.state.playing]}
                  class="videoplayer"
                />
                <div className="media-controls">
                  <PlayPause className="media-control media-control--play-pause" />
                  <CurrentTime className="media-control media-control--current-time" />
                  <div className="media-control-group media-control-group--seek">
                    <SeekBar className="media-control media-control--seekbar" />
                  </div>
                  <Duration className="media-control media-control--duration" />
                  <MuteUnmute className="media-control media-control--mute-unmute" />
                  <Volume className="media-control media-control--volume" />
                  <Fullscreen className="media-control media-control--fullscreen" />
                </div>
              </div>
               }
               { avail &&
                 <div className='novid'>
                 <div>
                 <VideocamOffIcon style={{height:230,width:230}}/>
                 <Typography style={{fontSize:"23px"}}> No Video for this Week </Typography>
                 </div>
                 </div>
               }
            </div>
          </Media>
          <div>
            <div class="thumb">
              <div class="nextheader">
                <p style={{ fontSize: "1.4em" }}>Next Up</p>
              </div>
              <Divider />
              <div class="nextvids">
                <List>
                  {this.state.thumbnail.map((item) => (
                    <div class="placethumb">
                      <ListItem button onClick={this.handleClick(item)}>
                        {item === this.state.thumbnail[this.state.playing] && (
                          <PlayArrowIcon />
                        )}
                        <img
                          alt="Video"
                          style={{ width: "60%", marginLeft: "10px" }}
                          src={item}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </div>
            </div>
          </div>
              <Downloads data={this.state.downloads} show={this.state.show} template={this.state.template}showtask={this.state.showtask}/>
        </div>
      </div>
    );
  }
}

//
function StartUp(props) {
  const classes = useStyles();
  const [expandedA, setExpandedA] = React.useState(false);
  const [downloads, setDownload] = React.useState([]);
  const [video, setVideo] = React.useState([]);
  const [task, setTask] = React.useState([]);
  const [selectedWeek, setWeek] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [upload, setupload] = React.useState(false);
  const [file, setfile] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandButtonClick = (key) => () =>{
    setExpanded(!expanded);
  };
  const handleClose = () => {
    setOpen(false);
  };
  var parse=props.weeks;
  const handleExpandClick = (key) => () => {
    setExpanded(!expanded);
    setWeek(key);
    setExpandedA(!expandedA);
  }; 

  const handleSubmitClick = (week) =>()  =>{
    var Week =parseInt(week)
    var vidcom= video.find(
        ({ week }) => week === Week
      )
    var taskcom= task.find(
        ({ week }) => week === Week
      )
     var downcom= downloads.find(
        ({ week }) => week === Week
      )
     var check=parse.find(({ week }) => week === Week
      )
     if(typeof check==='undefined'){
         vidcom = typeof vidcom === 'undefined' ? {week:Week,video:false}:vidcom;
         taskcom = typeof taskcom === 'undefined' ? {week:Week,task:false}:taskcom;
         downcom = typeof downcom === 'undefined' ? {week:Week,download:false}:downcom;
     }
     else{
         vidcom = typeof vidcom === 'undefined' ? {week:Week,video:false}:vidcom;
         taskcom = typeof taskcom === 'undefined' ? {week:Week,task:false}:taskcom;
         downcom = typeof downcom === 'undefined' ? {week:Week,download:false}:downcom
        vidcom = check.video ?{week:Week,video:true} :vidcom;
        taskcom = check.task ?{week:Week,task:true} :taskcom;
        downcom = check.download ?{week:Week,task:true} :downcom;
     }
     var thisweek={week:Week,video:vidcom.video,task:taskcom.task,download:downcom.download}
     if(checker(Week,'task') || upload){
      UpdateWeek(Week);
      setupload(false)
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_END}/businesses/updateWeeks`,
      data: thisweek,
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res);
    });
   }
   else{
        setOpen(true);
   }
  };
    const handleFile = (e)=> {
      setfile(e.target.files[0])
   }
  const handleVideoClick = (e)=> {
    var { value } = e.target;
    value=parseInt(value)
    setVideo([...video,{week:value,video:true}])
  };
   const handleDownloadClick = (e)=> {
    var { value } = e.target;
    value=parseInt(value)
    setDownload([...downloads,{week:value,download:true}])
  };
   const percentage = (week) =>{
        const weekno=parseInt(week)

     var percent=0;
     var check=parse.find(({ week }) => week === weekno
      )
     check = typeof check ==='undefined'? {task:false,download:false,video:false}:check;
     percent= check.video ? percent+1:percent
     percent= check.task ? percent+1:percent
     percent= check.download ? percent+1:percent
     percent=percent/3;
     percent=percent*100;
       return percent;
   }
   const handleTaskClick = (e)=> {
    var { value } = e.target;
    value=parseInt(value)
    setTask([...task,{week:value,task:true}])
  };
   const handleUpload =(e) =>{
   const fd = new FormData();
   console.log(file);
    fd.append("file", file);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_END}/businesses/files/upload`,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      setupload(true)
      console.log(res);
    });
   }
  const checker =(week,type)=>{
    const weekno=parseInt(week)
    var check=parse.find(({ week }) => week === weekno
      )
    if(type ==='video'){
      check = typeof check ==='undefined'? {week:weekno,video:false}:check;

          return check.video ;

    } 
    else if(type ==='download'){
      check = typeof check ==='undefined'? {week:weekno,download:false}:check;

          return check.download ;

    }
    else{
            check = typeof check ==='undefined'? {week:weekno,task:false}:check;
           return check.task;
    }
  }
  const data = props.data;
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title="Start Up" />
        <CardContent>
          <List>
            {data.map(({ Week, Focus }) => (
              <ListItem style={{ paddingTop: "1vh" }}>
                <Card className={classes.board}>
                  <CardHeader
                    title={
                      <Link
                        to={`/Startup/${Week}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p style={{ color: "#000" }}>
                          Week {Week}: {Focus}
                        </p>
                      </Link>
                    }
                    action={
                      <IconButton label="1" onClick={handleExpandClick(Week)}>
                        <CircularProgressWithLabel
                          value={percentage(Week)}
                        />
                      <IconButton onClick={handleExpandButtonClick(Week)} className={selectedWeek === Week ? clsx(classes.expand, {[classes.expandOpen]: expanded,}):'empty'} >
                           <ExpandMoreIcon />
                      </IconButton>
                      </IconButton>
                    }
                  />
                  {selectedWeek === Week && (
                    <Collapse in={expandedA} timeout="auto" unmountOnExit>
                      <CardContent>
                        <div className="reverse">
                          <Checkbox
                           defaultChecked={checker(Week,'video')}
                          onChange={handleVideoClick}
                            value={Week}
                            size="small"
                            inputProps={{ "aria-label": "Checkbox A" }}
                          />
                          <Typography
                            style={{
                              fontSize: "15px",
                              marginTop: 8,
                              height: 6,
                              paddingLeft: 15,
                            }}
                          >
                            Video Watched
                          </Typography>
                        </div>
                        <div className="reverse">
                          <Checkbox
                            value={Week}
                            defaultChecked={checker(Week,'download')}
                          onChange={handleDownloadClick}

                            size="small"
                            inputProps={{ "aria-label": "Checkbox B" }}
                          />
                          <Typography
                            style={{
                              fontSize: "15px",
                              marginTop: 8,
                              height: 6,
                              paddingLeft: 15,
                            }}
                          >
                            Notes Downloaded
                          </Typography>
                        </div>
                        <div className="reverse">
                          <Checkbox
                            onChange={handleTaskClick}
                            defaultChecked={checker(Week,'task')}
                            value={Week}
                            size="small"
                            inputProps={{ "aria-label": "Checkbox C" }}
                          />
                          <Typography
                            style={{
                              fontSize: "15px",
                              marginTop: 8,
                              paddingLeft: 15,
                            }}
                          >
                            Task
                          </Typography>
                        </div>
                      </CardContent>
                       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                   
                            <DialogTitle id="form-dialog-title">Task File Submission</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Add required files 
                              </DialogContentText>
                                <input
                                    type="file"
                                    accept="*"
                                    onChange={handleFile}
                                 style={{width:'100%'}}                
                                  id="customFile"
                                />
                            </DialogContent>

                            <DialogActions>
                              <StyledButtonpop onClick={handleClose} >
                                Cancel
                              </StyledButtonpop>
                              <StyledButtonpop onClick={handleUpload} >
                                Upload
                              </StyledButtonpop>
                            </DialogActions>
                          </Dialog>
                      <div className='placesubmit'>
                          <StyledButton onClick={handleSubmitClick(Week)}>
                          SUBMIT
                          </StyledButton>
                      </div>
                    </Collapse>
                  )}
                </Card>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

class StartUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }
  async componentWillMount() {
    var current = parseInt(localStorage.getItem("current"));
    if (isNaN(current)) {
      localStorage.setItem("current", 1);
    } else {
      localStorage.setItem("current", current);
    }

    this.getData();
  }

  getData = () => {
    this.props.fetchVideos();
  };
  componentDidMount() {
    this.setState({ list: this.props.videos });
  }

  render() {
     const { avatarUrl,weeks } = JSON.parse(
        localStorage.getItem("posts")
      )?.posts?.profile[0];    return (
      <div>
        <div style={{ height: 122, width: "100%" }} className="reversest">
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
        <div className="start">
          <Switch>
            <Route
              exact
              path="/Startup"
              render={(props) => <StartUp {...props} data={this.state.list} weeks={weeks}/>}
            />
            <Route
              exact
              path="/Startup/:id"
              render={(props) => (
                <ContentPage {...props} data={this.state.list} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

StartUpPage.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  videos: state.posts.videos,
});

export default connect(mapStateToProps, { fetchVideos })(StartUpPage);

