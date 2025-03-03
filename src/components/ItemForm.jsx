import { useState, useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ItemForm = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const { addItem } = useContext(ShoppingListContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || quantity <= 0) {
            toast.error("🚨 Nom invalide ou quantité incorrecte !");
            return;
        }
    
        fetch('http://localhost/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, quantity }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                toast.success("✅ Article ajouté !");
                setName("");
                setQuantity("");
                navigate("/list");
            } else {
                toast.error("Erreur lors de l'ajout de l'article.");
            }
        })
        .catch(error => {
            toast.error("Erreur de connexion au serveur.");
            console.error("Erreur:", error);
        });
    };    

    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    margin: "20px auto",
                    maxWidth: 500,
                    textAlign: "center",
                    borderRadius: "15px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                    ➕ Ajouter un Article
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Nom de l'article"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="number"
                        label="Quantité"
                        variant="outlined"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        required
                        inputProps={{ min: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                            mt: 2,
                            transition: "0.3s",
                            backgroundColor: "#4CAF50",
                            "&:hover": {
                                backgroundColor: "#388E3C",
                            },
                            boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
                        }}
                    >
                        Ajouter <AddShoppingCartIcon sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default ItemForm;
