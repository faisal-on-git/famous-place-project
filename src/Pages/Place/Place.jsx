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



const API_KEY="5ae2e3f221c38a28845f05b66351998fe63eabc50c9b2f6c950ece4f";

export class Place extends Component {
  state={
    place:{}
  }
  componentDidMount() {

    console.log(this.props,"props from place")
    console.log(this.props.match.params.id,"id")
    const id=this.props.match.params.id
    axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${id}?apikey=${API_KEY}`).then(response => {
      this.setState({place:response.data})
                  console.log(response.data)
                  console.log(response.data.address.city)
                  
              })

        }

       
  render() {
  
   
    return (
      <div className='detail-container'>
      { (this.state.place.preview && this.state.place.preview.source) &&  <   img src={this.state.place.preview.source} className='details-image'></img>}
        <div className='detail-text-container'>
      {(this.state.place.address ) && <div className='detail-address'>
        <div className='detail-address-title'>{this.state.place.name}</div>
        <div className='detail-address-subtitle'>{this.state.place.address.city}</div>
        <div className='detail-address-subtitle'>{this.state.place.address.road}</div>
        <div className='detail-address-subtitle'>{this.state.place.address.house}</div>
        <div className='detail-address-subtitle'>{this.state.place.address.postcode}</div>
        <div className='detail-address-subtitle'>{this.state.place.address.country}</div>
       </div>}
        </div>
        
        </div>
    )
  }
}

export default withRouter(Place)