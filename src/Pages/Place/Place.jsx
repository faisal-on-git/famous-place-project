// import React, { Component } from 'react'


// export class Place extends Component {

//     componentDidMount() {
//         console.log(this.props,"props")
//             }
//   render() {
//     // const {match} = this.props
//     // const {id}= match.params
//     // console.log(id)

  
//     return (
//       <div>Place</div>
//     )
//   }
// }

// export default Place


// import React from 'react'
// // import { useParams } from 'react-router-dom'
// import { useEffect,useState } from 'react'
// import { WithRouter } from 'react-router'
// import axios from 'axios'
// import './place.css'
// const API_KEY="5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";


// const Place = () => {
//     const {id} = useParams()
//     const [place, setPlace] = useState({})
//     const [imgAvailable, setImgAvailable] = useState(false)

//     useEffect(() => {
//         axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${id}?apikey=${API_KEY}`).then(response => {
//             setPlace(response.data)
//             console.log(response.data)
//             console.log(response.data.address.city)
            
//         })

//             }, [id])
    

//   return (
  //   <div className='detail-container'>
  // { (place.preview && place.preview.source) &&  <   img src={place.preview.source} className='details-image'></img>}
  //   <div className='detail-text-container'>
  // {(place.address ) && <div className='detail-address'>
  //   <div className='detail-address-title'>{place.name}</div>
  //   <div className='detail-address-subtitle'>{place.address.city}</div>
  //   <div className='detail-address-subtitle'>{place.address.road}</div>
  //   <div className='detail-address-subtitle'>{place.address.house}</div>
  //   <div className='detail-address-subtitle'>{place.address.postcode}</div>
  //   <div className='detail-address-subtitle'>{place.address.country}</div>
  //  </div>}
  //   </div>
    
  //   </div>
//   )
// }

// export default WithRouter(Place)

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Box ,Stack} from '@mui/system';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';



const API_KEY="5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";

export class Place extends Component {
  state={
    place:{}
  }
  componentDidMount() {

    // console.log(this.props.location.state.data,"props from place page")
    console.log(this.props.match.params.id,"id")
    
    // const id=this.props.match.params.id
    try{
      const id=this.props.location.state.data
      axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${id}?apikey=${API_KEY}`).then(response => {
        this.setState({place:response.data})
                    console.log(response.data)
                    console.log(response.data.address.city)
                    
                })
    }
    catch(error){
      console.log(error)
    }
    

        }

       
  render() {
  
  
    return (
      // <div className='detail-container'>
      // { (this.state.place.preview && this.state.place.preview.source) &&  <   img src={this.state.place.preview.source} className='details-image'></img>}
      //   <div className='detail-text-container'>
      // {(this.state.place.address ) && <div className='detail-address'>
      //   <div className='detail-address-title'>{this.state.place.name}</div>
      //   <div className='detail-address-subtitle'>{this.state.place.address.city}</div>
      //   <div className='detail-address-subtitle'>{this.state.place.address.road}</div>
      //   <div className='detail-address-subtitle'>{this.state.place.address.house}</div>
      //   <div className='detail-address-subtitle'>{this.state.place.address.postcode}</div>
      //   <div className='detail-address-subtitle'>{this.state.place.address.country}</div>
      //  </div>}
      //   </div>
        
      //   </div>

      <Stack  alignItems={'center'} spacing={2} sx={{display:'flex',flexDirection:{xs:'column',sm:'row'}  ,justifyContent:'space-between',m:2,p:2}}>

      <Box flex={1} mr={2}>
        <Card  >
        <CardHeader title={(this.state.place.address ) && this.state.place.name} sx={{display:{xs:'block',sm:'none'},textAlign:'center'}} />
 {this.state.place.preview? <CardMedia
 objectFit="contain"
  component="img"
        height="400"
        image={(this.state.place.preview && this.state.place.preview.source) && this.state.place.preview.source}
        alt="Paella dish"
       >
          

  </CardMedia>:
  <CardMedia
  objectFit="contain"
    component="img"
        height="400"
        
        image="https://www.goodmorninghdloveimages.com/wp-content/uploads/2020/05/Sorry-Images-Free-Download-For-Whatsapp-8.jpg"
        alt="Paella dish">
  </CardMedia>
  
  }

  </Card>
  
      </Box>
      {this.state.place.wikipedia_extracts ?
      
      <Box flex={1.5}  >

      <Card>
        <CardHeader title={(this.state.place.address ) && this.state.place.name} sx={{display:{xs:'none',sm:'block'},textAlign:'center'}} 
        subheader={(this.state.place.address.country ) && this.state.place.address.country}

        
        />
        
        <CardContent>
         { this.state.place.wikipedia_extracts && <Typography variant="body2" color="text.secondary">
          {this.state.place.wikipedia_extracts.text}

          </Typography>}
          
        </CardContent>
  </Card>

  </Box>:
  <Box flex={1.5} sx={{display:{xs:'none',sm:'block'}}} >

  <Card>
    <CardHeader title={(this.state.place.address ) && this.state.place.name} sx={{display:{xs:'none',sm:'block'},textAlign:'center'}} />
    <CardContent>
     { this.state.place.wikipedia_extracts && <Typography variant="body2" color="text.secondary">
      {this.state.place.wikipedia_extracts.text}
      </Typography>}
    </CardContent>
</Card>

</Box>
  }
  


      </Stack>
    )
  }
}

export default withRouter(Place)