import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#0B0F3C",
    fontSize: "18px",
    textTransform: "uppercase",
    // marginLeft: "1rem",
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const location = useLocation();
  const handleLogout = () => {
    AuthService.logout();
    window.location = "/";
  };
  const user = AuthService.getCurrentUser();
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <List>
          {user &&
            ((
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/">Home</Link>
                </ListItemText>
              </ListItem>
            ),
            (<button onClick={handleLogout}>Log out</button>))}
          {
            (!user && (
              <ListItem
                to="/login"
                replace
                state={{ from: location }}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText>Log in</ListItemText>
              </ListItem>
            ),
            (
              <ListItem
                to="/signup"
                replace
                state={{ from: location }}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText>Sign up</ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
