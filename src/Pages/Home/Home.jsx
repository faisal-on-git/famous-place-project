import React, { Component } from "react";
import axios from "axios";
import PlaceCard from "../../Components/placeCard/PlaceCard";
// import "./Home.css";
// import './Home.css'
import { Link, withRouter } from "react-router-dom";
import Place from "../Place/Place";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material";
import { display } from "@mui/system";
import Navbar from "../../Components/Navbar";
const API_KEY = "5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";
const API_KEY_AUTO="e1cc2855c09c40a4a961ac0f0392a7ef"

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spots: [],
      latitude: 40.712776,
      longitude: -74.005974,
      // searchText: "",
    };
  }


  componentDidMount() {
    console.log("hi");
    // fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=76.970310&lat=11.016010&kinds=interesting_places&limit=10&apikey=${API_KEY}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
    //   .then( data => {
    //     this.setState({spots:data.features})
    //     console.log(data)
    //   })
    //   .catch(error => console.log(error)

    // )

    axios
      .get(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${this.state.longitude}&lat=${this.state.latitude}&kinds=interesting_places&limit=10&apikey=${API_KEY}`
      )
      .then((response) => {
        this.setState({ spots: response.data.features });
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.props.searchText) {
      axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${this.props.searchText}&format=json&apiKey=${API_KEY_AUTO}`)
        .then((response) => {
          // this.setState({ spots: response.data.features });
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    const handleNavigation = (xid) => {
      console.log(xid);
      // this.props.history.push(`/${xid}`)
      // const { history } = this.props;
      // history.push('/');
      console.log(this.props.history, "props from home");
      this.props.history.push(`/${xid}`);
    };
// const setSearchText = (e) => {
//   this.setState({ searchText: e.target.value });
//   console.log(this.state.searchText);
// };

    return (
      // <div className="">
      <div >
      
        <Box>
        {/* <div className='card-list-container'></div> */}
        {this.state.spots.map((spot) => (
          // <Link  className ='link' key={spot.id} onClick={handleNavigation} >
          // <div
          //   key={spot.id}
          //   onClick={() => handleNavigation(spot.properties.xid)}
          // >
            // {/* <PlaceCard place={spot} key={spot.id}  xid={spot.properties.xid}></PlaceCard> */}
            // {/* <Link to={`/${spot.properties.xid}`}/> */}
            // {/* <Link to={"/123"}>Click</Link> */}
            <Paper
              elevation={3}
              className="card-container"
              direction="column"
              sx={{ p: 1 ,display:'flex',flexDirection:'column',alignItems:'center',mb:1}}
              key={spot.id}
              onClick={() => handleNavigation(spot.properties.xid)}
          
            >
              
              <Stack
                // direction="column"
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Stack  sx={{ display: "flex",flexDirection:"column" ,alignItems: "center" }}>
                  <Typography variant="h6" gutterBottom  sx={{textAlign:'center'}}>
                    {spot.properties.name}
                  </Typography>

                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Rating
                      name="text-feedback"
                      // max={10}
                      value={spot.properties.rate / 2}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ display: 'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'flex-start' }}
                >
                 <Box sx={{display:'flex',alignItems:'center',flexWrap:'wrap',justifyContent:'center'}}>
                  {window.innerWidth>=600 ?spot.properties.kinds.split(",").map((tag) => (
                    <Button
                      variant="contained"
                      color="primary"
                      key={tag}
                      size="small"
                      sx={{  m:1 }}
                    >
                      {tag}
                    </Button>
                  )):spot.properties.kinds.split(",").slice(0,2).map((tag) => (
                    <Button
                      variant="contained"
                      color="primary"
                      key={tag}
                      size="small"
                      sx={{  m:1 }}
                    >
                      {tag}
                    </Button>
                  ))
                  
                  
                  }
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          // </div>
        ))}
        </Box>
      </div>
    );
  }
}

export default withRouter(Home);


// { xs: "none", sm: "flex" }