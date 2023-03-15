import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@mui/material'
// import { allowedUser } from './allowedUser';
const { allowedUser } = require('./allowedUser');

export  class Login extends Component {

    
    static contextType = AuthContext;

    state={
        username:'',
        password:'',
        currentUser:''
    }
   

    componentDidMount() {
        console.log(this.context.user.user,"context");
  this.dispatch = this.context.dispatch;
  this.setState({currentUser:this.context.user.user})

    }
    componentDidUpdate(prevProps,prevState) {
        console.log(this.state,"state from login");
        console.log(prevState,"prevState from login");
        if (this.state.currentUser !== prevState.currentUser) {
        //    this.setState({username:this.context.user.user})
        //    this.dispatch({type:"LOGIN",payload:this.state.username})
           this.props.updateUser(this.state.username)
        }
    }

    
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state,"state");
        console.log(allowedUser,"allowedUser");

        for (let i = 0; i < allowedUser.length; i++) {
            if (allowedUser[i].username === this.state.username && allowedUser[i].password === this.state.password) {
                console.log("login success");
                this.dispatch({type:"LOGIN",payload:allowedUser[i].username})
                this.setState({currentUser:allowedUser[i].username})
                this.props.updateUser(allowedUser[i].username)
                this.props.history.push('/',{data:""});
                return;
            }
            else{
                this.props.history.push('/signup');
            }
        }
    }
 
  render() {
    const paperStyle={}
    
    return (
      <div>
         {/* <div>
        hi
        <form onSubmit={this.handleSubmit} >
            <input  onChange={(e) => this.setState({username:e.target.value})} type="text" placeholder="username"/>
            <input  onChange={(e) => this.setState({password:e.target.value})} type="password" placeholder="password"/>
            <button type="submit">Login</button>
        </form>
    </div> */}

<Grid  alignItems='center'>
            <Paper align='center' elevation={10}  style={paperStyle} sx={{padding :5,width:{xs:'70vw',sm:'40vw', md:'20vw'}, m:"100px auto"}}>
                <Grid align='center'>
                    
                    <h2>Sign In</h2>
                </Grid>
                <TextField  sx={{m:1}} label='Username' placeholder='Enter username' fullWidth required onChange={(e) => this.setState({username:e.target.value})}/>
                <TextField  sx={{m:1}} label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={(e) => this.setState({password:e.target.value})} />
                
                <Button sx={{m:1}} type='submit' color='primary' variant="contained"  fullWidth onClick={this.handleSubmit}>Sign in</Button>
             
            </Paper>
        </Grid>


      </div>
    )
  }
}

export default withRouter(Login)