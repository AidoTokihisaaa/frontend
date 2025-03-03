import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import Header from "./components/Header";
import AddItemPage from "./pages/AddItemPage";
import ListPage from "./pages/ListPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Home from './pages/Home'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")); 
  return (
    <Router>
      <ShoppingListProvider>
        <Header />
        <Routes>
          {}
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add" element={<AddItemPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          {}
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </ShoppingListProvider>
    </Router>
  );
};

export default App;
