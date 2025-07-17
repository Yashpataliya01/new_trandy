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
    }, 1000 * 60 * 10); // 10 minutes

    return () => clearTimeout(timer);
  }, []);

  // WhatsApp URL with prefilled message
  const whatsappNumber = "+918112261905";
  const prefilledMessage = encodeURIComponent(
    "Hello! I'm interested in learning more about your products/services. Can you provide more details?"
  );

  // Try `whatsapp://` for desktop apps, fallback to `https://wa.me/` for browsers/mobile
  const isDesktopApp = navigator.userAgent.includes("WhatsApp"); // Basic check for WhatsApp desktop app
  const whatsappLink = isDesktopApp
    ? `whatsapp://send?phone=${whatsappNumber}&text=${prefilledMessage}`
    : `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  return (
    <AppProvider>
      <Suspense fallback={<div>Loading application...</div>}>
        <RouterProvider router={routes} />
        {showModal && <UserInfoModal onClose={() => setShowModal(false)} />}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp size={40} color="white" />
        </a>
      </Suspense>
    </AppProvider>
  );
}

export default App;
