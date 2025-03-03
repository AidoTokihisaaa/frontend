import { useContext, useEffect, useState } from "react";
import { Container, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ShoppingListContext } from "../context/ShoppingListContext";

const Home = () => {
  const { items, deleteItem, addItem, deletedCount } = useContext(ShoppingListContext);
  const [addedCount, setAddedCount] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    setAddedCount(items.length);
  }, [items]);

  return (
    <Container
      sx={{
        textAlign: "center",
        mt: 5,
        maxWidth: "md",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
<motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: darkMode ? "#000000" : "#333" }}>
    Bienvenue sur votre Liste de Courses
  </Typography>
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.5 }}
>
  <Typography variant="body1" sx={{ color: darkMode ? "#000000" : "#333", maxWidth: "600px", mb: 3 }}>
    Gérez facilement vos articles de courses, ajoutez-les à votre liste et suivez vos achats au fur et à mesure. Simplifiez vos courses avec une interface claire et fonctionnelle.
  </Typography>
</motion.div>


      <Box sx={{ mt: 4, mb: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 3, backgroundColor: "#e8f5e9", borderRadius: "8px", boxShadow: 3, height: "100%" }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#388e3c" }}>
                  {addedCount} Articles
                </Typography>
                <Typography variant="body1" sx={{ color: "#388e3c" }}>
                  Ajoutés à votre liste
                </Typography>
              </motion.div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 3, backgroundColor: "#f1f8e9", borderRadius: "8px", boxShadow: 3, height: "100%" }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.0 }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#689f38" }}>
                  {deletedCount} Articles
                </Typography>
                <Typography variant="body1" sx={{ color: "#689f38" }}>
                  Supprimés cette semaine
                </Typography>
              </motion.div>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add"
          sx={{
            mt: 2,
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          <ShoppingCartIcon sx={{ marginRight: 1 }} />
          Ajouter un article
        </Button>
      </motion.div>

      <Box sx={{ mt: 6, maxWidth: "800px", width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: darkMode ? "#000000" : "#333" }}>
          Comment ça fonctionne ?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 3, backgroundColor: "#f9fbe7", borderRadius: "8px", boxShadow: 3 }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <CheckCircleIcon sx={{ fontSize: "50px", color: "#388e3c", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#388e3c" }}>
                  Étape 1
                </Typography>
                <Typography variant="body1" sx={{ color: "#388e3c" }}>
                  Ajoutez vos articles à la liste.
                </Typography>
              </motion.div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 3, backgroundColor: "#f9fbe7", borderRadius: "8px", boxShadow: 3 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                <FavoriteIcon sx={{ fontSize: "50px", color: "#e91e63", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#e91e63" }}>
                  Étape 2
                </Typography>
                <Typography variant="body1" sx={{ color: "#e91e63" }}>
                  Suivez vos achats au fur et à mesure.
                </Typography>
              </motion.div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 3, backgroundColor: "#f9fbe7", borderRadius: "8px", boxShadow: 3 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <ShoppingCartIcon sx={{ fontSize: "50px", color: "#2196f3", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2196f3" }}>
                  Étape 3
                </Typography>
                <Typography variant="body1" sx={{ color: "#2196f3" }}>
                  Supprimez ou modifiez vos articles à volonté.
                </Typography>
              </motion.div>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        >
          <Button
            variant="text"
            color="secondary"
            component={Link}
            to="/list"
            sx={{
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              mt: 2
            }}
          >
            Voir la Liste de Courses
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Home;