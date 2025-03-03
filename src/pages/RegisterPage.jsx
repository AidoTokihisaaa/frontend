import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Box, InputAdornment, IconButton, FormControlLabel, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

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

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            toast.error("Cet email est déjà utilisé");
            return;
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        toast.success("Inscription réussie");
        navigate("/login");
    };

    const handleGeneratePassword = () => {
        const generatedPassword = generatePassword();
        setPassword(generatedPassword);
        setConfirmPassword(generatedPassword);
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
                        Inscription
                    </Typography>

                    <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField label="Email" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <TextField label="Mot de passe" type={showPassword ? "text" : "password"} variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                        <Button variant="text" color="secondary" sx={{ marginTop: 1, textAlign: "center", fontSize: 12 }} onClick={handleGeneratePassword}>Générer un mot de passe</Button>

                        <TextField label="Confirmer le mot de passe" type={showConfirmPassword ? "text" : "password"} variant="outlined" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }} />

                        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>S'inscrire</Button>
                        <Button variant="text" color="primary" sx={{ marginTop: 1 }} onClick={() => navigate("/login")}>Déjà un compte ? Se connecter</Button>
                    </Box>

                    <Box sx={{ marginTop: 3, textAlign: "center" }}>
                        <FormControlLabel control={<Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />} label="Mode sombre" />
                    </Box>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default RegisterPage;
