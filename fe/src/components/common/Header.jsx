/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  Button,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
  ListItemIcon,
  Divider, // Import the Button component
} from "@mui/material";
import fullLogo from "../../assets/full-logo.png";
import {
  Settings,
  ExitToApp,
  ShoppingBag,
  AccountBalance,
  Support,
  Article,
  Brightness4,
} from "@mui/icons-material"; // Icons to match the design
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/userSlice";
// import LoginModal from "../auth/Login";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = Cookies.get("token");

  const handleOpen = () => setOpen(true);
  const user = useSelector((state) => state?.auth?.user);
  console.log("user", user);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/");
    toast.success("Logged Out");
    handleCloseUserMenu();
  };

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  return (
    <>
      <Box>
        <HideOnScroll {...props}>
          <Box className="navbar">
            <Toolbar className="nav-section">
              <Box className="logo-box">
                <img
                  src={fullLogo}
                  alt="logo-main"
                  loading="lazy"
                  className="logo"
                  onClick={() => navigate("/")}
                />
              </Box>
              <Box className="nav-right">
                {location.pathname === "/" && !token && (
                  <Box sx={{ ml: "auto" }}>
                    <Button
                      className="common-button-blue"
                      onClick={() => navigate("/login")}
                    >
                      Login / Signup
                    </Button>
                  </Box>
                )}
                {token && (
                  <>
                    {/* <Box sx={{ ml: "auto" }}> */}
                    {/* <Box sx={{ display: { xs: "none", sm: "block" } }}> */}

                    <Button
                      className={
                        location.pathname === "/dashboard"
                          ? "nav-button active"
                          : "nav-button"
                      }
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashbaord
                    </Button>
                    <Button
                      className={
                        location.pathname === "/watchlist"
                          ? "nav-button active"
                          : "nav-button"
                      }
                      onClick={() => navigate("/watchlist")}
                    >
                      Watchlist
                    </Button>

                    {/* </Box> */}
                    <Box sx={{ flexGrow: 0 }}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                      {/* <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography sx={{ textAlign: "center" }}>
                            Profile
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography
                            sx={{ textAlign: "center" }}
                            onClick={() => {
                              Cookies.remove("token");
                              navigate("/");
                              toast.success("Logged Out");
                            }}
                          >
                            Logout
                          </Typography>
                        </MenuItem>
                      </Menu> */}
                      <Menu
                        sx={{ mt: "50px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {/* User Info */}
                        <MenuItem>
                          <Typography variant="body1" fontWeight="bold">
                            {user?.name}
                          </Typography>
                        </MenuItem>
                        <MenuItem>
                          <Typography variant="body2" color="textSecondary">
                            {user?.email}
                          </Typography>
                        </MenuItem>
                        <Divider />

                        {/* Menu Options */}
                        <MenuItem onClick={handleCloseUserMenu}>
                          <ListItemIcon>
                            <ShoppingBag fontSize="small" />
                          </ListItemIcon>
                          <Typography>All Orders</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCloseUserMenu();
                            navigate("/bank-details", {
                              state: { user: user },
                            });
                          }}
                        >
                          <ListItemIcon>
                            <AccountBalance fontSize="small" />
                          </ListItemIcon>
                          <Typography>Bank Details</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <ListItemIcon>
                            <Support fontSize="small" />
                          </ListItemIcon>
                          <Typography>24 x 7 Customer Support</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <ListItemIcon>
                            <Article fontSize="small" />
                          </ListItemIcon>
                          <Typography>Reports</Typography>
                        </MenuItem>
                        <Divider />

                        {/* Logout Option */}
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <Brightness4 fontSize="small" />
                          </ListItemIcon>
                          <Typography>Log out</Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                    {/* </Box> */}
                  </>
                )}
              </Box>
            </Toolbar>
          </Box>
        </HideOnScroll>
      </Box>

      {/* <LoginModal open={open} setOpen={setOpen} /> */}
    </>
  );
}
