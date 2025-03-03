import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Box, InputAdornment, IconButton, FormControlLabel, Switch } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = (isDarkMode) => createTheme({
    palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
            main: '#1976d2',
        },
        background: {
            default: isDarkMode ? '#121212' : '#fafafa',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff',
        },
        text: {
            primary: isDarkMode ? '#e0e0e0' : '#000000',
        }
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(user => user.email === email);

        if (!user) {
            toast.error("Utilisateur non trouvé");
            return;
        }

        if (user.password !== password) {
            toast.error("Mot de passe incorrect");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        toast.success("Connexion réussie");
        navigate("/home");
    };

    return (
        <ThemeProvider theme={theme(isDarkMode)}>
            <Box sx={{
                display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "background.default", transition: "background-color 0.3s ease"
            }}>
                <Paper elevation={8} sx={{
                    padding: 5, maxWidth: 500, width: "100%", borderRadius: 3, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", '&:hover': { 
                        transform: 'scale(1.02)',
                        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)", 
                        transition: "0.3s ease" 
                    }
                }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ marginBottom: 3 }}>
                        Connexion
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField label="Email" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <TextField label="Mot de passe" type={showPassword ? "text" : "password"} variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>Se connecter</Button>
                        <Button variant="text" color="primary" sx={{ marginTop: 1 }} onClick={() => navigate("/register")}>Pas encore de compte ? S'inscrire</Button>
                    </Box>

                    <Box sx={{ marginTop: 3, textAlign: "center" }}>
                        <FormControlLabel control={<Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />} label="Mode sombre" />
                    </Box>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default LoginPage;
