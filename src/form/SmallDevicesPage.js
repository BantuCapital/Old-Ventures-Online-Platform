import React, { Component } from 'react';
import  "./login.css"
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import MobileOffIcon from '@material-ui/icons/MobileOff';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
class SmallDevicesPage extends Component{
      
   render() {
    return ( 
     <div  className="smallscreen">
          <div className='devices'>
            <DesktopWindowsIcon style={{  height:55,width:55}} />
            <DesktopMacIcon style={{  height:55,width:55,paddingLeft:10}}/>
            <TabletMacIcon style={{  height:55,width:55,paddingLeft:10}}/>
            <MobileOffIcon style={{  height:55,width:55,paddingLeft:10}}/>
          </div>
          <p className='ptext' style={{fontSize: '18px'}}>Unfortunately VenturesOnline is not available on this device</p>


    </div>
  );
  }
}
export default SmallDevicesPage;