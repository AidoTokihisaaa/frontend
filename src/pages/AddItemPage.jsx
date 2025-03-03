import { useState, useContext, useEffect } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { TextField, Button, Box, Typography, Grid, Paper, Autocomplete, CircularProgress, IconButton, Select, MenuItem, InputLabel, FormControl, LinearProgress, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CheckCircle, Error, ShoppingCart, Delete, Edit } from "@mui/icons-material";

const getProductPrice = (name, products) => {
  const product = products.find((product) => product.name.toLowerCase() === name.toLowerCase());
  return product ? product.price : 3;
};

const getProductImage = (name) => {
  const API_KEY = "gh5vUd7U4dGs0EMBDbVXAeQu2QS1Zl1xcI6jP2KlMtuLAPiqyJdPzdLK";
  return fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=1`, {
    headers: { Authorization: API_KEY },
  })
    .then((response) => response.json())
    .then((data) => data.photos[0].src.medium)
    .catch((err) => {
      console.error("Erreur de récupération de l'image", err);
      return "https://via.placeholder.com/200"; 
    });
};

const AddItemPage = () => {
  const [name, setName] = useState(""); 
  const [quantity, setQuantity] = useState(1); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [category, setCategory] = useState(""); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [productImage, setProductImage] = useState(""); 
  const [addedItems, setAddedItems] = useState([]);  
  const [showModal, setShowModal] = useState(false);
  const { addItem } = useContext(ShoppingListContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de chargement des produits", error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = (e, newValue) => {
    setName(newValue);
    const price = getProductPrice(newValue, products);
    setTotalPrice(price * quantity);
    getProductImage(newValue).then((imageUrl) => setProductImage(imageUrl));
  };

  const handleQuantityChange = (e) => {
    const productQuantity = e.target.value;
    setQuantity(productQuantity);
    const price = getProductPrice(name, products);
    setTotalPrice(price * productQuantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && quantity > 0) {
      const newItem = { name, quantity, totalPrice, productImage };  
      setAddedItems([...addedItems, newItem]);  
      addItem(name, quantity);
    }
  };

  const handleFinishList = () => {
    setShowModal(true);
  };

  const handleModalClose = (confirm) => {
    if (confirm) {
      navigate("/list");
    }
    setShowModal(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f4f8", padding: 2 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Paper sx={{ padding: 4, maxWidth: 800, width: "100%", borderRadius: 3, boxShadow: 6, backgroundColor: "#fff", marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#3f51b5" }}>
            Ajouter un article
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Catégorie</InputLabel>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Catégorie">
                    <MenuItem value="Fruits">Fruits</MenuItem>
                    <MenuItem value="Légumes">Légumes</MenuItem>
                    <MenuItem value="Viande">Viande</MenuItem>
                    <MenuItem value="Boissons">Boissons</MenuItem>
                    <MenuItem value="Repas">Repas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={name}
                  onChange={handleNameChange}
                  inputValue={name}
                  options={products.map((product) => product.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Nom de l'article" variant="outlined" fullWidth required sx={{ marginBottom: 2 }} />
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                  loading={loading}
                  disableClearable
                  noOptionsText={loading ? <CircularProgress size={24} /> : "Aucune option"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  label="Quantité"
                  variant="outlined"
                  value={quantity}
                  onChange={handleQuantityChange}
                  fullWidth
                  required
                  inputProps={{ min: 1 }}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                {name && (
                  <>
                    <Typography variant="h6" color="textSecondary" sx={{ fontWeight: "bold" }}>
                      Prix Unité: {getProductPrice(name, products)} € / unité
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
                      Prix Total: {totalPrice.toFixed(2)} €
                    </Typography>
                    <img src={productImage} alt={name} style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "15px" }} />
                  </>
                )}
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary" sx={{ width: "100%", marginTop: 3, fontWeight: "bold", letterSpacing: 1 }}>
              Ajouter à la Liste
            </Button>
          </form>

          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}>
            Articles Ajoutés :
          </Typography>

          <Grid container spacing={3}>
            {addedItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${item.name}-${index}`}>
                <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img src={item.productImage} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: 10 }} />
                  <div>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                    <Typography variant="body2">Quantité: {item.quantity}</Typography>
                    <Typography variant="body2">Prix Total: {item.totalPrice.toFixed(2)} €</Typography>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Button variant="contained" color="secondary" sx={{ marginTop: 3, width: "100%" }} onClick={handleFinishList}>
            Fin de la Liste ?
          </Button>
        </Paper>
      </motion.div>

      {}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          borderRadius: 3,
          padding: 4,
          boxShadow: 24
        }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Avez-vous fini votre liste ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="outlined" color="primary" onClick={() => setShowModal(false)}>
              Non
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleModalClose(true)}>
              Oui, finir la liste
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddItemPage;
