import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import { Switch, Route, Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import './start.css';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Media, Player, withMediaProps, withKeyboardControls, controls } from 'react-media-player'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import Fullscreen from './Fullscreen'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { fetchVideos } from '../../storage/actions/postActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const { CurrentTime,SeekBar, Duration, Volume } = controls
const useStyles = makeStyles((theme) => ({
  root: {
    position:"relative",
    left:20,
    top:"1vh",
    width: "95%",
      height:"80vh",
      overflow:"scroll"
  },
   board: {
       position:"relative",
       top:"4vh",
      left:20,
      width: "95%",
      minHeight:"15vh",
      maxHeight:"70vh"
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
}));
//
function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={63} variant="static"  {...props} />
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
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
//
function youtubeLinkParser(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
}
//
function Video(props){
        const extract =props.data[0].Videos;
       
      return(
          <Media>
            <div class='video'>
                    <div
                    className={'media-player'}
                    tabIndex="0"
                  >
                    <Player
                      src={extract[sessionStorage.getItem("playing")]}
                      class='videoplayer'
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
            </div>
        </Media>

    )
}
function NextUp(props){
   const extract =props.data[0].Videos;
   var thumbnail = extract.map(x => youtubeLinkParser(x));
    thumbnail= thumbnail.map(x=> `https://img.youtube.com/vi/${x}/0.jpg`)
    const handleClick = key => () =>{
       var playing=thumbnail.indexOf(key) 
        sessionStorage.setItem("playing", playing);
         console.log(sessionStorage.getItem("playing"))
    
  };
   return(
              
          <div class='thumb'>
           <div class='nextheader'>
            <p style={{'font-size': '1.4em'}}>Next Up</p>
           </div>
             <Divider />
           <div class='nextvids'>
             <List>
                {thumbnail.map((item)=> (
                  <div class='placethumb'>
                    <ListItem button >
                        <img alt='GR' style={{width:'60%'}}src={item} />
                    </ListItem>
                      <Divider />
                    </div>
                  ))}
             </List>
            </div>
          </div>

    )
}
function Downloads({match}){

   
     

     const handleClick = key => () =>{
           var percent=0;
           switch (key) {
                 case "Notes":
                   sessionStorage.setItem("Notes",true);
                    if(parseInt(sessionStorage.getItem("notedown"),10) ===0){
                       percent =parseInt(sessionStorage.getItem("percent"),10)+33;
                       sessionStorage.setItem("percent", percent);
                       sessionStorage.setItem("notedown",1);

                     }
                   break;
                  case "Task":
                   sessionStorage.setItem("Task",true);
                   if(parseInt(sessionStorage.getItem("taskdown"),10) ===0){
                      var com =parseInt(sessionStorage.getItem("percent"),10)+33;
                       sessionStorage.setItem("percent", com);
                      sessionStorage.setItem("taskdown",1);

                     }
                   break;
                  default:
                   break;
                 }
              var  check =parseInt(sessionStorage.getItem("percent"),10);
            if(check===100){
             var current =parseInt(sessionStorage.getItem("current"),10)+1;
             sessionStorage.setItem("current", current);
             sessionStorage.setItem("percent", 0);
               sessionStorage.setItem("watched", 0);
              sessionStorage.setItem("taskdown",0);
              sessionStorage.setItem("notedown",0);

             sessionStorage.setItem("Notes", false);
             sessionStorage.setItem("Task", false);
             sessionStorage.setItem("Videos", false);
       }
       };
    return(
            <div class='Notes'>
               <Grid container>
                  <Grid class='notestext' item xs={6}>
                       <Typography style={{'text-align':'center','font-size': '1.0em',marginLeft:"70px",marginTop:'11px'}}>Notes</Typography>
                      <Typography style={{'text-align':'center','font-size': '1.0em',marginTop:"29px"}}>Weekly Task</Typography> 
                 </Grid>
                 <Grid item xs={1}>
                  <div class='notesicon'>

                   <IconButton onClick={handleClick("Notes")} href="https://drive.google.com/u/0/uc?id=1JIK68HauHFg8SNCQt5DQ8lZc8tLyuo1k&export=download">
                    <GetAppIcon  />
                    </IconButton>
                    <IconButton onClick={handleClick("Task")}>
                    <GetAppIcon />
                    </IconButton>
                  </div>
                </Grid>  
                
              </Grid>
            </div>

    )


}
//
class ContentPage extends React.Component{
   constructor(props) {

    super(props);



    this.state = {
      data:[{"Week":1,"Focus":"How to Start a Startup","Videos":["https://youtu.be/bNpx7gpSqbY","https://youtu.be/PwstCP7Rodo"],"Notes":"https://drive.google.com/file/d/1rYXIgqjUIlDwEhumeSzvfoEPrqEMaNZe/view?usp=sharing","Task":"https://drive.google.com/file/d/1H1yKtXQTJIxwE4vRHT42wVXGiI_rIWZa/view?usp=sharing"},{"Week":2,"Focus":"Team & Execution","Videos":["https://youtu.be/bNpx7gpSqbY","https://youtu.be/PwstCP7Rodo"],"Notes":"https://drive.google.com/file/d/1rYXIgqjUIlDwEhumeSzvfoEPrqEMaNZe/view?usp=sharing","Task":"https://drive.google.com/file/d/1H1yKtXQTJIxwE4vRHT42wVXGiI_rIWZa/view?usp=sharing"},{"Week":3,"Focus":"How to Run a User Interview","Videos":["https://youtu.be/5tVbFfGDQCk"],"Notes":"https://drive.google.com/file/d/19Ici6QlFKKij-I9L07fJP-ZySDwWONgf/view?usp=sharing","Task":"https://drive.google.com/file/d/1FvTvt-CnW_x4fgQ8p20NQLYxltZVC-CJ/view?usp=sharing"}],
      thumbnail:[],
      videos:[],
      playing:0,
      watched:false,
    };

  };
   componentWillMount(){
     var id=parseInt(this.props.match.params.id);
     const material= this.state.data.find(({Week}) => Week === id);
     console.log(material);
     const extract =this.state.data[2].Videos;
     this.setState({videos:extract});
     var images = extract.map(x => youtubeLinkParser(x));
     images= images.map(x=> `https://img.youtube.com/vi/${x}/0.jpg`);
      sessionStorage.setItem("watched", 0);
         
      this.setState({thumbnail:images});
   }
   componentDidMount(){

          console.log(this.props)
          console.log("amazing")
   
   }
   handleClick  = value => () => {
      var play=this.state.thumbnail.indexOf(value);
       var completed= play+1;
      if (completed === this.state.thumbnail.length ){
        sessionStorage.setItem("Videos",true)
         if(parseInt(sessionStorage.getItem("watched"),10) ===0){
             var update =parseInt(sessionStorage.getItem("percent"),10)+34;
             sessionStorage.setItem("watched", 1);
             sessionStorage.setItem("percent", update);
           
         }
      var  check =parseInt(sessionStorage.getItem("percent"),10);
    if(check===100){
              var current =parseInt(sessionStorage.getItem("current"),10)+1;
             sessionStorage.setItem("current", current);
             sessionStorage.setItem("percent", 0);
               sessionStorage.setItem("watched", 0);
              sessionStorage.setItem("taskdown",0);
              sessionStorage.setItem("notedown",0);

             sessionStorage.setItem("Notes", false);
             sessionStorage.setItem("Task", false);
             sessionStorage.setItem("Videos", false);
       }


      }
      this.setState({playing:play})
   }
  render(){
    return(
            <div class='cover'>
               <div class='Contentcard'>
                    <Media>
                        <div class='video'>
                            <div
                            className={'media-player'}
                            tabIndex="0"
                          >
                              <Player
                                src={this.state.videos[this.state.playing]}
                                class='videoplayer'
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
                      </div>
                    </Media>
                    <div>
                       <div class='thumb'>
                       <div class='nextheader'>
                        <p style={{'font-size': '1.4em'}}>Next Up</p>
                       </div>
                         <Divider />
                       <div class='nextvids'>
                         <List>
                            {this.state.thumbnail.map((item)=> (
                              <div class='placethumb'>
                                <ListItem button onClick={this.handleClick(item)} >
                                  { item === this.state.thumbnail[this.state.playing] &&(
                                    <PlayArrowIcon />
                                  )}
                                    <img alt='GR' style={{width:'60%',marginLeft:"10px"}}src={item} />
                                </ListItem>
                                  <Divider />
                                </div>
                              ))}
                         </List>
                        </div>
                      </div>

                    </div>
                    <Downloads />
               </div>
            </div>

    )

  }
}
//
 function StartUp(props){
  const classes = useStyles();
  const [expandedA, setExpandedA] = React.useState(false);
  const [selectedWeek, setWeek] = React.useState(null);

  const [expandedC, setExpandedC] = React.useState(false);
  var intro='into'
  const handleExpandClick = key => () =>{
        setWeek(key)
        setExpandedA(!expandedA);
   
    
  };
   var current=parseInt(sessionStorage.getItem("current"),10);
 
   const data=props.data;
  return (
    <div>
     <Card className={classes.root}>
        <CardHeader
           title="Start Up"
       
        />
        <CardContent>
        <List>
        {data.map(({Week,Focus})=> (
           <ListItem style={{paddingTop:"1vh"}}>
              <Card className={classes.board}>
                <CardHeader
                  title={
                    <Link to={Week <=current ?`/Startup/${Week}` : '#'} style={{ textDecoration: 'none'}}>
                    <p style={{'color':'#000'}}>Week {Week}: {Focus}</p>
                    </Link>
                    }
                       action={
                     <IconButton label="1" onClick={handleExpandClick(Week)}  >
                       <CircularProgressWithLabel  value={Week <current ? 100: Week === current ? sessionStorage.getItem("percent"):0} />
                     </IconButton>
                     }
                  />
                { selectedWeek ===Week &&(
                   <Collapse in={expandedA} timeout="auto" unmountOnExit>
                <CardContent>
                  <div className="reverse">
                          <Checkbox checked={Week>current ? false : Week <current ? true: Week === current? JSON.parse(sessionStorage.getItem("Videos")):"false"} value="checkedA" size="small" inputProps={{ 'aria-label': 'Checkbox A' }}/>
                          <Typography style={{'font-size': '15px',marginTop:8,height:6,paddingLeft:15}}>Video Watched</Typography>
                  </div>
                  <div className="reverse">
                          <Checkbox checked={Week>current ? false : Week <current ? true: Week === current? JSON.parse(sessionStorage.getItem("Notes")):"false"}  value="checkedB" size="small" inputProps={{ 'aria-label': 'Checkbox B' }}/>
                          <Typography style={{'font-size': '15px',marginTop:8,height:6,paddingLeft:15}}>Notes Downloaded</Typography>
                  </div>
                   <div className="reverse">
                          <Checkbox checked={Week>current ? false : Week <current ? true: Week === current? JSON.parse(sessionStorage.getItem("Task")):"false"}  value="checkedC" size="small" inputProps={{ 'aria-label': 'Checkbox C' }}/>
                          <Typography style={{'font-size': '15px',marginTop:8,paddingLeft:15}}>Task</Typography>
                  </div>
                </CardContent>
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

 class StartUpPage extends React.Component{
   constructor(props) {

    super(props);



    this.state = {
      list:[ ] };

  };
    async componentWillMount() {
   sessionStorage.setItem("percent", 0);
    sessionStorage.setItem("Notes", false);
    sessionStorage.setItem("Task", false);
    sessionStorage.setItem("Videos", false);
    sessionStorage.setItem("current", 2);
    sessionStorage.setItem("taskdown",0);
     sessionStorage.setItem("notedown",0);
            this.getData();
  }

    getData = () => {
    this.props.fetchVideos();
     }
  componentDidMount(){
 
          this.setState({list:this.props.videos});

  }
  

  render(){
  return(
     <div className="start">
        
            <Switch>
           <Route  exact path="/Startup" render={(props) => (
               <StartUp  {...props} data={this.state.list} />
             )}
             />
           <Route exact path="/Startup/:id" render={(props) => (
               <ContentPage  {...props} data={this.state.list} />
             )}
             />
          </Switch>
       </div>
  )
}

}

StartUpPage.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  videos:state.posts.videos
});

export default connect(mapStateToProps, { fetchVideos })(StartUpPage)