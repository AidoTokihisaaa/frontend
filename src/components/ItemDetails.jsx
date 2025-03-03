import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { toast } from "react-toastify";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const ItemDetails = () => {
    const { id } = useParams();
    const { items } = useContext(ShoppingListContext); 
    const navigate = useNavigate();
    const item = items.find((i) => i.id.toString() === id);
    if (!item) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h5" color="error">⚠ Article introuvable</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/list")} sx={{ mt: 3 }}>
                    <ArrowBackIcon /> Retour à la liste
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Paper elevation={4} sx={{ padding: 4, borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
                <Typography variant="h4" gutterBottom>📌 {item.name}</Typography>
                <Typography variant="h6" color="textSecondary">Quantité : {item.quantity}</Typography>
                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate("/list")}>
                        <ArrowBackIcon sx={{ mr: 1 }} /> Retour à la liste
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ItemDetails;
