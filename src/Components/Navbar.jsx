import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import{styled, Typography,InputBase, Avatar,Menu,MenuItem} from '@mui/material'
export class Navbar extends Component {
    state={
        open:false
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   return this.state.open !== nextState.open;
    // }
  


  render() {
  const  handleClick = () => {
      this.setState({ open: !this.state.open });
    };
  // const handleInputChange = (e) => {
  //   this.props.setSearchText(e.target.value);
  //   console.log(this.props.searchText);
  // };
    
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

        <AppBar  >
            <StyledToolbar>
                <Typography variant="h6" component="div" >
                    Famous Places
                </Typography>
                <Search><InputBase  placeholder="Enter text"
        value={this.props.searchText}
        onChange={this.props.setSearchText} autoFocus></InputBase></Search>
                <StyledAvtarBox onClick={handleClick}>
                 <Avatar   sx={{ bgcolor: 'red' }}>F</Avatar>
                </StyledAvtarBox>
                </StyledToolbar>
                <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={this.state.open}
        onClose={(e) => this.setState({ open: false })}
        
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClick}> Favourite</MenuItem>
        </Menu>
        </AppBar>
      </div>
    )
  }
}

export default Navbar