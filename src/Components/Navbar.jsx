import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {withRouter} from 'react-router-dom'
import{styled, Typography,InputBase, Avatar,Menu,MenuItem, Autocomplete, TextField, Stack} from '@mui/material'
import { height } from '@mui/system';
import { AuthContext } from '../context/AuthContext';
export class Navbar extends Component {
  static contextType = AuthContext;
    state={
        open:false,
        currentUser:''
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   return this.state.open !== nextState.open;
    // }
  componentDidMount() {
   this.user= this.context.user;
  //  this.currentUser=this.user.user;
   this.setState({currentUser:this.user.user})
  //  console.log(this.user.user.charAt(0),"currentUser in navbar");
  
  }

handleLogout=()=>{
  this.context.dispatch({type:"LOGOUT"})
  this.setState({currentUser:''})
  this.props.history.push('/login');
}


handleLogin=()=>{
  this.props.history.push('/login');
}

handleFavoriteNavigation=() => {
  this.props.history.push("/favourites");
}

  render() {
  const  handleClick = () => {
      this.setState({ open: !this.state.open });
    };
    const sendHome = () => {
      console.log("hi from sendHome",this.props);
      this.props.history.push("/");
    };
  // const handleInputChange = (e) => {
  //   this.props.setSearchText(e.target.value);
  //   console.log(this.props.searchText);
  // };
  const handleOptionSelected = (option) => {
    console.log("lat", option.data.lat);
    console.log("lon", option.data.lon);
    this.props.setCordinates(option.data.lat, option.data.lon);
    console.log(option,'option');
  }
  const handleInputChange = (e,value)=>{
    this.props.setSearchText(value);
    console.log(this.props.searchText);
  }
    
    const Search = styled("div")(({ theme }) => ({
        backgroundColor: "white",
        padding: "0 10px",
        borderRadius: theme.shape.borderRadius,
        width: "40%",
      }));
      
     const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between",
        });

        const StyledAvtarBox=styled(Box)({
            display:'flex',
        })
    return (
      <div style={{position:'sticky' ,margin:'64px' ,zIndex:1}}>
          
        <AppBar sx={{display:'flex' ,mb:4 }}  >
       
  
            <Toolbar sx={{display:"flex",justifyContent:'space-between' ,alignItems:"center" }}>

           
                <Typography variant="h6" component="div" onClick={sendHome} sx={{cursor:'pointer'}}  >
                    Famous Places
                </Typography>
                
                <Stack sx={{display:'flex' ,alignItems:'center' ,justifyContent:'center'  ,height:"40px" ,overflow:'hidden'}}>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      loading={true}
      options={this.props.options}
      sx={{ width: {xs:150,sm:300} ,border:'none', display:'flex',alignItems:'center',justifyContent:'center',alignSelf:'center',height:'80%',backgroundColor:'white'}}
      renderInput={(params) => <TextField {...params} label="Cities.." autoFocus />}
      // onChange={(e,val) => setOp(val)}
      // onInputChange={console.log(op)}
      onChange={(event,option) => handleOptionSelected(option)}
      inputValue={this.props.searchText}
      onInputChange={(event, newInputValue) => {
        // handleInputChange(event,newInputValue);
        this.props.setSearchText(event,newInputValue);
      }}
      freeSolo={false}
      autoFocus
      // sx={{width:'40%'}}
    />
         </Stack>       
                {/* <Search> */}





                  
                  {/* <InputBase  placeholder="Enter text"
        value={this.props.searchText}
        onChange={this.props.setSearchText} autoFocus></InputBase> */}
        {/* <Autocomplete
         options={this.props.options}
         getOptionLabel={(option) => option.address_line1}
          // style={{ width: 300 }}
          // renderInput={(params) => <InputBase {...params} placeholder="Enter text" value={this.props.searchText} onChange={this.props.setSearchText } autoFocus />}
          // inputValue={this.props.searchText}
          // onInputChange={(e, value) => this.props.setSearchText(value)}
          onChange={(event,option) => handleOptionSelected(option)}
          renderInput={(params) => <TextField {...params} placeholder="Enter text"  />}
          inputValue={this.props.searchText}
          onInputChange={handleInputChange}
     
        >

        </Autocomplete> */}
            {/* <Autocomplete
      // disablePortal
      id="combo-box-demo"
      options={this.props.options}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Movie" autoFocus />}
      // onChange={(e,val) => setOp(val)}
      // onInputChange={console.log(op)}
      onChange={(event,option) => handleOptionSelected(option)}
      inputValue={this.props.searchText}
      onInputChange={(event, newInputValue) => {
        // handleInputChange(event,newInputValue);
        this.props.setSearchText(newInputValue);
      }}
      freeSolo={false}
      autoFocus
    /> */}
    {/* <input value={this.props.searchText} onChange={(e)=> this.props.setSearchText(e,e.target.value)}></input> */}
        
        {/* </Search> */}




     
                <StyledAvtarBox onClick={handleClick}>
                 <Avatar   sx={{ bgcolor: 'red' ,cursor:'pointer'}}>{this.state.currentUser?this.state.currentUser.charAt(0).toUpperCase():'g'}</Avatar>
                </StyledAvtarBox>
                </Toolbar>

                
                <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={this.state.open}
        onClose={(e) => this.setState({ open: false })}
        onClick={handleClick}
        
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={this.handleFavoriteNavigation} > Favourite</MenuItem>
        {this.state.currentUser? <MenuItem onClick={this.handleLogout} >Logout</MenuItem>:
        <MenuItem onClick={this.handleLogin} >Login</MenuItem>
      }
        </Menu>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(Navbar)