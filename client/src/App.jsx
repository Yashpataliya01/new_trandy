import React, { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import UserInfoModal from "./components/authentication/UserInfo.jsx";
import "./App.css";
import { routes } from "./routes/Route.jsx";
import { AppProvider } from "./context/AuthContext.jsx";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem("user-info-submitted");
    if (alreadySubmitted) return;

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000 * 60 * 10); // 3 seconds (corrected from your comment about 10 minutes)

    return () => clearTimeout(timer);
  }, []);

  // WhatsApp URL with country code
  const whatsappNumber = "+918112261905";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <AppProvider>
      <Suspense>
        <RouterProvider router={routes} />
        {showModal && <UserInfoModal onClose={() => setShowModal(false)} />}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={40} color="white" />
        </a>
      </Suspense>
    </AppProvider>
  );
}

export default App;
