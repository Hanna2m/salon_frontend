import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

// import "./styles/_header.css";
import DrawerComponent from "./Drawer";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(3),
    marginBottom: "5rem",
  },
  // navlinks: {
  //   marginLeft: theme.spacing(1),
  //   display: "flex",
  // },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#0B0F3C",
    fontSize: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      borderBottom: "1px solid grey",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const handleLogout = () => {
    AuthService.logout();
    window.location = "/";
  };
  const user = AuthService.getCurrentUser();

  return (
    <AppBar className={classes.root} position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          <img src={logo} className="logo" />
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {user && (
              <div>
                <p style={{ color: "black" }}>Welcome, {user.name} </p>
                <div>
                  <Link to="/" className={classes.link}>
                    Home
                  </Link>
                  {user.role === "Admin" && (
                    <Link to="/dashboard" className={classes.link}>
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout}>Log out</button>
                </div>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
                <Link
                  to="/signup"
                  replace
                  state={{ from: location }}
                  className={classes.link}
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  replace
                  state={{ from: location }}
                  className={classes.link}
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        )}
      </Toolbar>
      <Outlet />
    </AppBar>
  );
}
export default Header;
