// import React, { useEffect } from 'react'
import { useState } from 'react'
import './tagCard.css'
import React, { Component } from 'react'

// const TagCard = (props) => {
//     console.log(props)

//   return (
 
//        <span className='tag-card-container'>{props.tag}</span>
    
//   )
// }

// export default TagCard


export class TagCard extends Component {
  render() {
    return (
       <span className='tag-card-container'>{this.props.tag}</span>
    
  )
    
    
  }
}

export default TagCard