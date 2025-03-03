import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button, 
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { motion } from "framer-motion";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  useEffect(() => {
    document.body.style.transition = "background 0.5s ease, color 0.5s ease";
    document.body.style.background = darkMode
      ? "linear-gradient(135deg, #2c3e50, #34495e)"
      : "linear-gradient(135deg, #ffffff, #f5f5f5)";
    document.body.style.color = darkMode ? "#ffffff" : "#333";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <AppBar
        position="static"
        sx={{
          background: darkMode ? "rgba(28, 28, 28, 0.95)" : "rgba(255, 255, 255, 0.9)",
          padding: "12px 24px",
          backdropFilter: "blur(10px)",
          boxShadow: darkMode
            ? "0px 4px 10px rgba(0, 0, 0, 0.4)"
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: darkMode ? "#ffffff" : "#2c3e50",
              textTransform: "uppercase",
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Ma Liste de Courses
          </Typography>

          {}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMenuToggle}>
              <MenuIcon sx={{ color: darkMode ? "#ffffff" : "#333cff" }} />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/home" sx={buttonStyles(darkMode)}>
                  Accueil
                </Button>
                <Button color="inherit" component={Link} to="/list" sx={buttonStyles(darkMode)}>
                  Ma Liste
                </Button>
                <Button color="inherit" component={Link} to="/add" sx={buttonStyles(darkMode)}>
                  Ajouter
                </Button>

                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={iconButtonStyles(darkMode)}
                >
                  <ExitToAppIcon sx={{ fontSize: "24px" }} />
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={buttonStyles(darkMode)}>
                  Se connecter
                </Button>
                <Button color="inherit" component={Link} to="/register" sx={buttonStyles(darkMode)}>
                  S'inscrire
                </Button>
              </>
            )}

            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
              sx={iconButtonStyles(darkMode)}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>

        {}
        <Drawer open={mobileMenuOpen} onClose={handleMenuToggle}>
          <List sx={{ width: "250px" }}>
            {user ? (
              <>
<ListItem button component={Link} to="/home">
  <ListItemIcon>
    <HomeIcon sx={{ color: darkMode ? "#333cff" : "#333cff" }} />
  </ListItemIcon>
  <ListItemText primary="Accueil" />
</ListItem>

<ListItem button component={Link} to="/list">
  <ListItemIcon>
    <ListAltIcon sx={{ color: darkMode ? "#333cff" : "#333cff" }} />
  </ListItemIcon>
  <ListItemText primary="Ma Liste" />
</ListItem>

<ListItem button component={Link} to="/add">
  <ListItemIcon>
    <AddCircleIcon sx={{ color: darkMode ? "#333cff" : "#333cff" }} />
  </ListItemIcon>
  <ListItemText primary="Ajouter" />
</ListItem>

<ListItem button onClick={handleLogout}>
  <ListItemIcon>
    <ExitToAppIcon sx={{ color: darkMode ? "#333cff" : "#333cff" }} />
  </ListItemIcon>
  <ListItemText primary="Se Déconnecter" />
</ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Se connecter" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="S'inscrire" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </AppBar>
    </motion.div>
  );
};

const buttonStyles = (darkMode) => ({
  fontWeight: "500",
  borderRadius: "8px",
  padding: "8px 18px",
  color: darkMode ? "#ffffff" : "#2c3e50",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: darkMode ? "#333" : "#f0f0f0",
    transform: "scale(1.05)",
  },
  marginRight: "15px",
});

const iconButtonStyles = (darkMode) => ({
  color: darkMode ? "#ffffff" : "#2c3e50",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: darkMode ? "#333" : "#f0f0f0",
    transform: "scale(1.05)",
  },
  marginLeft: "15px",
});

export default Header;
