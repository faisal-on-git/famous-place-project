// import React from 'react'
import React, { Component } from 'react'


import TagCard from '../TagCard/TagCard'
// import './tagList.css'

// const TagList = (props) => {

//   return (
//     <div className='taglist-container'>

//        {props.tagList.map((tag, index) => {
//               return <TagCard tag={tag} key={index}></TagCard>
//             })
//        }
//     </div>
//   )
// }

// export default TagList



export class TagList extends Component {
  render() {
    return (
      <div className='taglist-container'>

             {this.props.tagList.map((tag, index) => {
                    return <TagCard tag={tag} key={index}></TagCard>
                  })
             }
          </div>
    )
  }
}

export default TagList