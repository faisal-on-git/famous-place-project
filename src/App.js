import "./App.css";
import React, { useState, useEffect } from "react";
import { Component } from "react";

import axios from "axios";
// import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Place from "./Pages/Place/Place";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";
import Favourite from "./Favourite";
import Login from "./Login";
import Signup from "./Signup";
import { AuthContext } from "./context/AuthContext";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import NotFound from "./NotFound";

import Fade from '@mui/material/Fade';

import CircularProgress from '@mui/material/CircularProgress';

// import PlaceCard from './Components/PlaceCard/PlaceCard';
const API_KEY = "5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";
const API_KEY_AUTO = "e1cc2855c09c40a4a961ac0f0392a7ef";

export default class App extends Component {
  state = {
    mode: "light",
    searchText: "",
    latitude: 11.01601,
    longitude: 76.97031,
    options: [{ data: {}, label: "" }],
    favourites: [],
    user: null,
    isSearchResultLoading: false,
    
  };
  static contextType = AuthContext;

  componentDidMount() {
    this.dispatch= this.context.dispatch;
    this.user= this.context.user;
    this.setState({ user: this.user });

    console.log(this.user,"I am the user from context of app.js");
    const storedFavorites =JSON.parse(localStorage.getItem(`${this.user.user}`))? JSON.parse(localStorage.getItem(`${this.user.user}`)).fav:[];

    if (storedFavorites) {
      this.setState({ favourites: storedFavorites });
    }
  }

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      // this.setState({isSearchResultLoading:true})
      this.setState({ options: [] }); // clear options
      axios
        .get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${this.state.searchText}&format=json&apiKey=${API_KEY_AUTO}`
        )
        .then((response) => {
          // this.setState({ spots: response.data.features });
          console.log(response.data.results);
          // this.setState({options:[...this.state.options,{data:{...response.data.results},label:response.data.results.address_line1}]})
          const temp = response.data.results.map((item, index) => ({
            data: { ...item },
            label: index + " " + item.address_line1,
          }));
          this.setState({ options: [...temp] });
          // this.setState({isSearchResultLoading:false})
          // response.data.results.map((item)=>this.setState({options:[...this.state.options,{data:{...item},label:item.properties.formatted}]}) )
        })
        .catch((error) => console.log(error));
    }
    // if (prevState.searchText !== this.state.searchText) {
    //   this.setState({ options: [] }); // clear options

    //   axios
    //     .get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${this.state.searchText}&format=json&apiKey=${API_KEY_AUTO}`)
    //     .then((response) => {
    //       console.log(response.data.results);
    //       const newOptions = response.data.results.map((item) => ({data:{...item}, label: item.properties.formatted}));
    //       this.setState({ options: newOptions }); // set new options
    //     })
    //     .catch((error) => console.log(error));
    // }

  if(prevState.user!==this.state.user){

    // console.log(prevState,"component didmoutn app.js");
    const favloc=localStorage.getItem(`${this.user.user}`)?JSON.parse(localStorage.getItem(`${this.user.user}`)).fav:[];
    this.setState({favourites:favloc})
  }

  }
  setCordinates = (lat, lon) => {
    this.setState({ latitude: lat, longitude: lon });
  };

  updateUser = (user) => {
    this.setState({ user: user });
  };

  isFavourite = (xid) => {
    const fav = this.state.favourites.filter(
      (item) => item.properties.xid === xid
    );
    if (fav.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  addToFavourites = (obj) => {
    if(this.isFavourite(obj.properties.xid)){
    const fav = this.state.favourites.filter(
      (item) => item.properties.xid !== obj.properties.xid
    );
    this.setState({ favourites: fav });
  
    localStorage.setItem(`${this.user.user}`, JSON.stringify({fav:fav,username:this.user.user}));
    }
    else{
    console.log("add to favourites");
    console.log(obj, "added to favourites");

    if(this.user.user===null){

    }
    else{
    const userObjWithFav={fav:obj,username:this.user.user}
    const fav=[...this.state.favourites, obj]

    this.setState({ favourites: fav });
    localStorage.setItem(
      `${this.user.user}`,
      // JSON.stringify([...this.state.favourites, obj])
      JSON.stringify({fav:fav,username:this.user.user})

    );
    }
  }
  };

  render() {
    // const {user}= this.context
    const setSearchText = (e, value) => {
      // this.setState({ searchText:value });
      // console.log(this.state.searchText);
      e.preventDefault();
      this.setState({ searchText: value }, () => {
        console.log(this.state.searchText);
      });
    };
    const darkTheme = createTheme({
      palette: {
        mode: this.state.mode,
      },
    });
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          {/* <Router> */}
          <Navbar
            searchText={this.state.searchText}
            setSearchText={setSearchText}
            options={this.state.options}
            setCordinates={this.setCordinates}
            isSearchResultLoading={this.state.isSearchResultLoading}

          />
          <Switch>
          <Route exact path="/favourites" render={(props) =>( <Favourite  {...props} favourites={this.state.favourites} addToFavourites={this.addToFavourites}  isFavourite={this.isFavourite}/>)} />
          {/* <Route path="/login" element={<Login/>}> </Route> */}
          <Route path="/login" render={(props) =>( <Login  {...props} updateUser={this.updateUser} />)} />
          <Route path='/signup' render={(props) =>( <Signup  {...props} />)} />
            <Route exact path="/:id" component={Place} />
          
            <Route
             exact path="/"
              render={(props) => (
                <Home
                  {...props}
                  searchText={this.state.searchText}
                  options={this.state.options}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  setCordinates={this.setCordinates}
                  isFavourite={this.isFavourite}
                  addToFavourites={this.addToFavourites}
                  favourites={this.state.favourites}
                />
              )}
            />
            {/* <Route path='/:id' element={<Place/>}> </Route> */}
            <Route path='*' render={(props) =>(<NotFound {...props}/>)}/> 

          </Switch>
          {/* </Router> */}
        </div>
      </ThemeProvider>
    );
  }
}
