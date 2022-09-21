import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';




export default function Navbar() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = createTheme({
        palette: {
          gibon: {
            // Purple and green play nicely together.
            main: '#ffffff',
          },
          secondary: {
            // This is green.A700 as hex.
            main: '#e3eb90',
          },
        },
      });

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>
                        우리조
                    </Link>
                    {/* <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                     */}
                    <div>
                    <ThemeProvider theme={theme}>
                       
                       
                        <Button
                           
                            color="gibon"
                            id="basic-button1"
                            aria-controls={open ? 'basic-menu1' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            소개
                        </Button>
                        <Menu
                            id="basic-menu1"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby1': 'basic-button1',
                            }}
                        >
                            <MenuItem onClick={handleClose}>페이지 소개</MenuItem>
                            <MenuItem onClick={handleClose}>사이트맵</MenuItem>
                        </Menu>







                        <Button
                           
                           color="gibon"
                           id="basic-button"
                           aria-controls={open ? 'basic-menu' : undefined}
                           aria-haspopup="true"
                           aria-expanded={open ? 'true' : undefined}
                           onClick={handleClick}
                       >
                           제품
                       </Button>
                       <Menu
                           id="basic-menu"
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleClose}
                           MenuListProps={{
                               'aria-labelledby': 'basic-button',
                           }}
                       >
                           <MenuItem onClick={handleClose}>제품 구매</MenuItem>
                       </Menu>






                       <Button
                           color="gibon"
                           id="basic-button"
                           aria-controls={open ? 'basic-menu' : undefined}
                           aria-haspopup="true"
                           aria-expanded={open ? 'true' : undefined}
                           onClick={handleClick}
                       >
                           플랫폼
                       </Button>
                       <Menu
                           id="basic-menu"
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleClose}
                           MenuListProps={{
                               'aria-labelledby': 'basic-button',
                           }}
                       >
                           <MenuItem onClick={handleClose}>보드</MenuItem>
                       </Menu>

                      
                      
                      
                      
                       <Button
                           
                           color="gibon"
                           id="basic-button"
                           aria-controls={open ? 'basic-menu' : undefined}
                           aria-haspopup="true"
                           aria-expanded={open ? 'true' : undefined}
                           onClick={handleClick}
                       >
                           회원
                       </Button>
                       <Menu
                           id="basic-menu"
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleClose}
                           MenuListProps={{
                               'aria-labelledby': 'basic-button',
                           }}
                       >
                           <MenuItem onClick={handleClose}>회원 정보 수정</MenuItem>
                           <MenuItem onClick={handleClose}>문의사항</MenuItem>
                       </Menu>
                        </ThemeProvider>

                        
                    </div>





                    <Link className="btn btn-outline-light" to="/adduser">
                        login
                    </Link>


                </div>
            </nav>

        </div>
    )
}
