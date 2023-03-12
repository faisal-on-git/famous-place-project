// import React, { useEffect } from 'react'
// import './placeCard.css'
import { useState } from 'react'
import TagCard from '../TagCard/TagCard'
import TagList from '../TagList/TagList'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// const PlaceCard = (props) => {
//   const [tags, setTags] = useState([])

//   const tagsArray = props.place.properties.kinds.split(',')
//   // setTags(tagsArray)
//   // useEffect(() => {
//   //   console.log(tagsArray)
//   // }, [])

  
//   return (
//     <div className='card-container'>
//          <h1>{props.place.properties.name}</h1>
//          {/* {tags.map((tag, index) => {

//             return <span key={index}>{tag}</span>
//           })
//          } */}
//        {/* <h3>{props.place.properties.kinds}</h3> */}

//        {/* <TagCard tag={props.place.properties.kinds.split(',')}></TagCard> */}
//        <TagList tagList={props.place.properties.kinds.split(',')}></TagList>
//     </div>
//   )
// }

// export default PlaceCard




export class PlaceCard extends Component {

  render() {
    return (
      <div className='card-container'>
        <h1>{this.props.place.properties.name}</h1>
        <TagList tagList={this.props.place.properties.kinds.split(',')}></TagList>
      </div>
    )
  }
}

export default PlaceCard