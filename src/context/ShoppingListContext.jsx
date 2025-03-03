import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("shoppingList");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [deletedCount, setDeletedCount] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("shoppingList", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (name, quantity) => {
    if (!name || quantity <= 0) {
      toast.error("🚨 Entrée invalide !");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      quantity,
      deleted: false,
    };
    
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      setDeletedCount((prevCount) => prevCount + 1);
      return updatedItems;
    });
    toast.warn("🗑 Article supprimé !");
  };

  return (
    <ShoppingListContext.Provider value={{ items, addItem, deleteItem, deletedCount, setItems }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
