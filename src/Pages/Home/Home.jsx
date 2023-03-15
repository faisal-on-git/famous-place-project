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
import { display, style } from "@mui/system";
import Navbar from "../../Components/Navbar";
import { AuthContext } from "../../context/AuthContext";
import Pagination from '@mui/material/Pagination';
import Fade from '@mui/material/Fade';

import CircularProgress from '@mui/material/CircularProgress';
// import { AuthContext } from '../../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
const API_KEY = "5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";
const API_KEY_AUTO="e1cc2855c09c40a4a961ac0f0392a7ef"


export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spots: [],
     
      options:[],
      currentPage: 1,
      spotsPerPage: 3,
      resultLoading: true,
      temp:true,
      currentUser:''
      // color:'grey'
      // searchText: "",
    };
  }
  static contextType = AuthContext;

  handleFavouiteClick = (spot) => {
    console.log("hi from home", spot);
    console.log(this.props)

    this.props.addToFavourites(spot)
    // console.log("I am called from handleFavouriteClick")
    

  }
  
  handlePageChange = (event, value) => {
    this.setState({
      currentPage: value,
    });
  };


  componentDidMount() {
    console.log("hi");
    this.setState({currentUser:this.context.user.user})
    
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
  // this.setState({resultLoading:true})
    axios
      .get(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${this.props.longitude}&lat=${this.props.latitude}&kinds=interesting_places&limit=10&apikey=${API_KEY}`
      )
      .then((response) => {
        this.setState({ spots: response.data.features });
        this.setState({resultLoading:false})
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("hi from home", prevProps);
  
    if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) { 
      // console.log("hi from home",prevProps );
      // console.log("hi from home this props",this.props );
      this.setState({resultLoading:true})
      axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${this.props.longitude}&lat=${this.props.latitude}&kinds=interesting_places&limit=10&apikey=${API_KEY}`)
        .then((response) => {
          this.setState({ spots: response.data.features });
          this.setState({resultLoading:false})
          // console.log(response.data);
        })
        .catch((error) => console.log(error));
    }

    if(prevState.user!==this.state.user){

      // console.log(prevState,"component didmoutn app.js");
    this.setState({currentUser:this.context.user.user})
    
    }
//  console.log(this.props.history,"history from home agian")
   
  }



  render() {
    // const {state}=this.context
    // console.log(state,"auth context state from home")
    const indexOfLastSpot = this.state.currentPage * this.state.spotsPerPage;
    const indexOfFirstSpot = indexOfLastSpot - this.state.spotsPerPage;
    const currentSpots = this.state.spots.slice(
     indexOfFirstSpot,indexOfLastSpot
    );
    console.log(currentSpots, "currentSpots");


    const handleNavigation = (xid,name) => {
      console.log(xid);
      // this.props.history.push(`/${xid}`)
      // const { history } = this.props;
      // history.push('/');
      // console.log(this.props.history, "props from home");
      const newName = name.replace(/\s+/g, '-');
      this.props.history.push(`/${newName}`,{data:xid});
    };


// const setSearchText = (e) => {
//   this.setState({ searchText: e.target.value });
//   console.log(this.state.searchText);
// };


    return (
      // <div className="">
      <Box>
      {this.state.resultLoading===false?

       
     
        <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        // m:4,
       
      }}>
        {/* <div className='card-list-container'></div> */}
        {currentSpots.map((spot) => (

          
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
              sx={{ p: 1 ,display:'flex',flexDirection:'column',alignItems:'center',mb:1,width:{sm:'90%',md:"80%" ,lg:'60%'},cursor:'pointer'}}
              key={spot.id}
              // onClick={() => handleNavigation(spot.properties.xid)}
          
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
                <Stack  sx={{ display: "flex",flexDirection:"column" ,alignItems: "center" ,cursor:'pointer'}} onClick={() => handleNavigation(spot.properties.xid,spot.properties.name)}>
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
                <IconButton aria-label="add to favorites" onClick={()=> this.handleFavouiteClick(spot)} >
          <FavoriteIcon   style={{ color: this.props.isFavourite(spot.properties.xid) ? 'red' : 'gray' }} />
        </IconButton>
              </Stack>
            </Paper>
          // </div>
        )
        
        )}
        <Pagination  onChange={this.handlePageChange} count={Math.ceil(this.state.spots.length/this.state.spotsPerPage)} variant="outlined" color="primary" elevation={3} sx={{m:2}} />
        </Box>:
      
        // <Box>
        //    <Fade
        //   in={true}
        //   style={{
        //     transitionDelay:true ? '800ms' : '0ms',
        //   }}
        //   unmountOnExit
        // >
        //   <CircularProgress />
        // </Fade>
        // </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* <h1>hello</h1> */}
        <Box sx={{ height: 80 ,m:50 }}>
          <Fade
            in={this.state.temp}
            style={{
              transitionDelay: this.state.temp ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
         </Box>
       
       
      
       </Box>
      }
       </Box>
        
    
    );
  }
}

export default withRouter(Home);


// { xs: "none", sm: "flex" }