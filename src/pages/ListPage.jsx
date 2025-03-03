import { useContext, useEffect, useState } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { List, ListItem, ListItemText, IconButton, Typography, Box, Paper, Divider, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment"; 
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListPage = () => {
  const { items, deleteItem, setItems } = useContext(ShoppingListContext);
  const [notification, setNotification] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(null);

  const getProductDetails = (name, products) => {
    if (!name || typeof name !== 'string') {
      console.error("Nom de produit invalide:", name);
      return { price: 0, description: "Pas de description disponible" };
    }

    const product = products.find(product => product.name.toLowerCase() === name.toLowerCase());
    return product ? product : { price: 0, description: "Pas de description disponible" };
  };

  useEffect(() => {
    const loadProducts = () => {
      const productsFromStorage = localStorage.getItem("products");
      if (productsFromStorage) {
        setProducts(JSON.parse(productsFromStorage)); 
      } else {
        fetch("/products.json")
          .then((response) => response.json())
          .then((data) => {
            setProducts(data);
            localStorage.setItem("products", JSON.stringify(data));
          })
          .catch((error) => {
            console.error("Erreur de chargement des produits", error);
          });
      }
    };
    loadProducts();
  }, []);

  const handleQuantityChange = (id) => {
    if (newQuantity <= 0) {
      toast.error("🚨 La quantité doit être supérieure à 0 !");
      return;
    }

    const updatedItems = items.map(item => {
      if (item.id === id) {
        const productDetails = getProductDetails(item.name, products);
        const updatedItem = {
          ...item,
          quantity: newQuantity,
          price: productDetails.price * newQuantity, 
        };
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
    setEditingId(null);
    setNotification(
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#27ae60", 
          color: "#fff",
          borderRadius: "20px",
          fontSize: "16px",
          maxWidth: "350px",
          margin: "0 auto",
          textAlign: "center",
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999
        }}
      >
        <CheckIcon style={{ marginRight: 10, fontSize: "24px" }} />
        Quantité et prix mis à jour !
      </motion.div>
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDelete = (id) => {
    deleteItem(id);
    setNotification(
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          borderRadius: "20px",
          fontSize: "16px",
          maxWidth: "350px",
          margin: "0 auto",
          textAlign: "center",
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999
        }}
      >
        <DeleteIcon style={{ marginRight: 10, fontSize: "24px" }} />
        Article supprimé !
      </motion.div>
    );
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Paper elevation={8} sx={{ padding: 4, margin: "40px auto", maxWidth: 900, textAlign: "center", borderRadius: "16px", backgroundColor: "#fff", boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.1)" }}>
        
        {}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#333", fontWeight: "bold", fontSize: "36px", letterSpacing: "1px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <AssignmentIcon sx={{ fontSize: "36px", color: "#3f51b5", marginRight: "10px" }} />
            Ma Liste de Courses
          </Typography>
        </motion.div>

        {}
        {notification && notification}

        {}
        {items.length === 0 ? (
          <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
            Aucun article. Ajoutez-en un !
          </Typography>
        ) : (
          <List>
            {items.map((item) => {
              const itemName = item.name || "";
              const itemDetails = getProductDetails(itemName, products); 
              const itemDescription = itemDetails.description;
              const itemPrice = itemDetails.price;

              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <ListItem sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px", marginBottom: "20px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", transition: "0.3s", "&:hover": { backgroundColor: "#f0f0f0" } }}>
                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <>
                            <Typography variant="body2" sx={{ fontWeight: "500", color: "#333" }}>
                              Quantité: {editingId === item.id ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <TextField
                                    type="number"
                                    value={newQuantity || item.quantity}
                                    onChange={(e) => setNewQuantity(e.target.value)}
                                    onBlur={() => handleQuantityChange(item.id)}
                                    autoFocus
                                    sx={{
                                      width: "80px",
                                      marginRight: "8px",
                                      backgroundColor: "#fafafa",
                                      borderRadius: "5px",
                                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                    }}
                                  />
                                  <IconButton onClick={() => handleQuantityChange(item.id)} sx={{ color: "#27ae60", fontSize: "1.8em", backgroundColor: "#fff", borderRadius: "50%" }}>
                                    <CheckIcon />
                                  </IconButton>
                                </Box>
                              ) : (
                                item.quantity
                              )}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#777" }}>
                              Prix: {itemPrice * item.quantity}€
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#777", marginTop: "5px" }}>
                              {itemDescription}
                            </Typography>
                          </>
                        }
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                      <IconButton edge="end" onClick={() => handleDelete(item.id)} sx={{ color: "#e74c3c", transition: "0.3s", "&:hover": { color: "#c0392b" } }}>
                        <DeleteIcon sx={{ fontSize: "1.5em" }} />
                      </IconButton>
                      <IconButton edge="end" onClick={() => { setEditingId(item.id); setNewQuantity(item.quantity); }} sx={{ color: "#f39c12", transition: "0.3s", "&:hover": { color: "#e67e22" } }}>
                        <EditIcon sx={{ fontSize: "1.5em" }} />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider sx={{ margin: "10px 0" }} />
                </motion.div>
              );
            })}
          </List>
        )}
      </Paper>
    </motion.div>
  );
};

export default ListPage;
