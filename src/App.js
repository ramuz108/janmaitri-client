import logo from './logo.svg';
import './App.css';
import React, { Component ,useEffect, useState  }  from "react";
import clientbg from './static/clientbg.gif';
import { withSnackbar } from 'notistack';
import axios from 'axios';
class App extends React.Component
{

  constructor(props) {

    super(props);
  
    this.state = { apiResponse: [],info: 0,error: 0,lat: 0,lon: 0,ip: "",db: "",date: "", offset: 0,tableData: [],orgtableData: [], perPage: 2,currentPage: 0,weatherloc: "",temp: 0,weatherdesc: "",weathericon: "",prevdata:0,intrusion:[],movement:[],vibration:[],heat:[],light:[]}
    
  }
  componentDidMount(){
    this.init();
    setInterval(() => {
      this.alarmdata();
      this.getlength();
    }, (3000));
  }
  init = () =>{
    axios
    .get('https://janamaitri.herokuapp.com/alm')
    .then(res => {
      
        this.setState({
            prevdata : res.data.results.length      
        })
    });
  }
  displaymove = (zone) =>{
  
    this.props.enqueueSnackbar('Movement Detected at '+zone, { 
      variant: 'warning',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
        
    },
   });
  }
  getlength = () =>
{ 
 
  //console.log(this.state.orgtableData[0]);
  console.log("Data: "+ this.state.orgtableData.length);
  console.log("Previous Data: "+ this.state.prevdata);
  if(this.state.orgtableData.length > this.state.prevdata){
    var remaining = this.state.orgtableData.length - this.state.prevdata;
    var balance = this.state.orgtableData.length - remaining;
    for(var i = 0; i < remaining; i++){
      console.log(this.state.orgtableData[i]);
      
          this.displaymove("SN - P");
       
    }
    //console.log("Move-->"+this.state.movement[0].alert_lat);
   // this.setState({prevdata: this.orgtableData.length});
  }
}
alarmdata = () =>{

  axios
  .get('https://janamaitri.herokuapp.com/alm')
  .then(res => {
      var tdata = res.data.results;
     console.log('data-->'+JSON.stringify(tdata))
     
      this.setState({
         
          orgtableData : tdata,
          
      })
  });
}
  render(){
    return(

      <div style={{backgroundColor:"black",width:"100%",height:"100%"}}>
          <center>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <img src={clientbg} width="500" height="250" />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </center>
      </div>
    )
  }
}

export default withSnackbar(App);
