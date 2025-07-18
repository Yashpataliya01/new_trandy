// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const API_ORIGIN = import.meta.env.VITE_ENCODED_URL;
  const [favcart, setFavcart] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.uid) {
        try {
          const res = await fetch(
            `${API_ORIGIN}/api/carts/getCartByUser/${user.uid}`
          );
          const data = await res.json();
          setFavcart(data?.products?.length || 0);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchData();
  }, [setFavcart]); // empty dependency array = only run once on mount

  const updateModal = (value) => {
    setShowModal(value);
  };

  return (
    <AppContext.Provider
      value={{ favcart, setFavcart, showModal, updateModal }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
