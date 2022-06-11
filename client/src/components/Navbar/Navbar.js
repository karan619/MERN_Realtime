import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../Images/memories.png";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");

    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memory
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logOut}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
