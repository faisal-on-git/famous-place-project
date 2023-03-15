import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
// import { addUser } from './allowedUser'

export  class Signup extends Component {

handleSubmit = (e) => {

        e.preventDefault();
        // addUser({username:this.state.username,password:this.state.password})
        console.log(this.state,"state after adding user");
}

    state={
        username:'',
        password:''
    }
  render() {
    return (
//       <div>
//  <form onSubmit={this.handleSubmit} >
//             <input  onChange={(e) => this.setState({username:e.target.value})} type="text" placeholder="username"/>
//             <input  onChange={(e) => this.setState({password:e.target.value})} type="password" placeholder="password"/>
//             <button type="submit">SignUP</button>
//         </form>

//       </div>
<Box sx={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
<Typography variant="h5" textAlign={'center'} >Sorry Currently we dont have SignUp feature </Typography>
<Typography variant="subtitle" textAlign={'center'} >For Please Login with username: "guest" and password: "guest" </Typography>
</Box>
    )
  }
}
export default withRouter(Signup)

