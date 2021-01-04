import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import  "./page.css"
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    position:"relative",
    left:"6vw",
    top:"10vh",
    width: "60%",
    maxWidth: "60%",
    minHeight:"73vh",
      maxHeight:"73vh",
      overflow:"auto"
  },
   media: {
    height: 190,
    paddingTop: '0.95%',
    paddingLeft:38,
     // 16:9
  },
}));

const phases=[
    {id:"1",phase:"Phase 1",plan:"Business plan",duration:"6 Weeks",image:"https://cdn.iconscout.com/icon/premium/png-512-thumb/setting-167-243672.png"},
    {id:"2",phase:"Phase 2",plan:"Automation",duration:"12 Weeks",image:"https://cdn.iconscout.com/icon/premium/png-512-thumb/setting-167-243672.png"},
    
]

export default function Accelerate() {
  const classes = useStyles(); 
  return (
    <div className="cover">
    <GridList cellHeight={"68vh"} style={{overflow: 'auto',width:"90%"}} cols={2}>
        {phases.map(({id,phase,plan,duration,image})=> (
          <GridListTile key={id}>
              <Card className={classes.root}>
                 <CardHeader
                  style={{ textAlign: 'center' }}
                  title={phase}
                  subheader={plan}
                  />
                  <CardContent>
                   <img
                       className={classes.media}
                       src={image}
                  />
                  <Typography style={{paddingTop: '5%','font-size': '20px',textAlign: 'center'}}>Duration: {duration} </Typography>
                    <Link style={{ textDecoration: 'none' ,color:"#696969"}} to="/startup">
                        <Typography style={{paddingTop: '2%','font-size': '18px',textAlign: 'center'}}>Get Started</Typography>
                   </Link>
                  </CardContent>
               </Card>
          </GridListTile>
          ))}
          <GridListTile >
                <Typography  style={{width:"80%",height:'27vh','font-size': '15px',marginBottom:10}}>

                 </Typography>

        </GridListTile>
      </GridList>
         
    </div>
  );
}