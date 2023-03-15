import React, { Component } from 'react'
import {Box, Paper, Stack,Button} from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
export default class Favourite extends Component {

    componentDidMount() {
        console.log(this.props,"I am from favourite")
    }
    handleFavouiteClick = (spot) => {
      console.log("hi from home", spot);
      console.log(this.props)
  
      this.props.addToFavourites(spot)
      // console.log("I am called from handleFavouriteClick")
      
  
    }


  render() {

   
    return (
      <div>
        <Box>
        {/* <div className='card-list-container'></div> */}
        {this.props.favourites && this.props.favourites.map((spot) => (
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
                <Stack  sx={{ display: "flex",flexDirection:"column" ,alignItems: "center" }} >
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
        ))}
        </Box>
      </div>
    )
  }
}
