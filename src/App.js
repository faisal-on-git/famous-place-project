
import './App.css';
import React, { useState,useEffect } from 'react';
import { Component } from 'react';

import axios from 'axios';
// import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import{BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Place from './Pages/Place/Place';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar';
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import PlaceCard from './Components/PlaceCard/PlaceCard';
const API_KEY="5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";






export default class App extends Component {
  state = {
    mode: 'light',
    searchText: '',
  };
  
  // const [spots, setSpots] = useState([]);

  

  // useEffect(() => {
  //   // fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=kochi&apikey=5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f`)
  //   //   .then(response => response.json())
  //   //   .then(data =>{ setSpots(data.features)
  //   //   console.log(data.features)})
  //   //   .catch(error => console.log(error));

  //   fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=76.970310&lat=11.016010&kinds=interesting_places&limit=10&apikey=${API_KEY}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then( data => {
  //       setSpots(data.features)
  //       console.log(data)
  //     })
  //     .catch(error => console.log(error)

    
    
  //   )
  // }, []);

  // componentDidMount(){
  //   // fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=76.970310&lat=11.016010&kinds=interesting_places&limit=10&apikey=${API_KEY}`, {
  //   //   method: 'GET',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'Accept': 'application/json'
  //   //   }
  //   // })
  //   //   .then(response => response.json())
  //   //   .then( data => {
  //   //     this.setState({spots:data.features})
  //   //     console.log(data)
  //   //   })
  //   //   .catch(error => console.log(error)

    
    
  //   // )

  //   axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${this.state.longitude}&lat=${this.state.latitude}&kinds=interesting_places&limit=10&apikey=${API_KEY}`)
  //   .then(response => {
  //     this.setState({spots:response.data.features})
  //     console.log(response.data)
  //   }
  //   )
  //   .catch(error => console.log(error)
  //   )
  // }

  render() {

const setSearchText = (e) => {
  this.setState({ searchText: e.target.value });
  console.log(this.state.searchText);
};
    const darkTheme = createTheme({
      palette: {
        mode: this.state.mode,
      },
    });
  return (
   <ThemeProvider theme={darkTheme}>
<div className='App'>
  {/* <Router> */}
  <Navbar searchText={this.state.searchText} setSearchText={setSearchText}/>
    <Switch>
    <Route exact path="/:id" component={Place}/>
    <Route path="/" render={(props) => <Home {...props} searchText={this.state.searchText}/>} />
      {/* <Route path='/:id' element={<Place/>}> </Route> */}
    
     
    </Switch>
    {/* </Router> */}
    </div>
    </ThemeProvider>
   
    
  );
    }
}


