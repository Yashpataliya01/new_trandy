import React, { Suspense, useEffect, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import UserInfoModal from "./components/authentication/UserInfo.jsx";
import "./App.css";
import { routes } from "./routes/Route.jsx";
import { AppProvider } from "./context/AuthContext.jsx";
import { FaWhatsapp } from "react-icons/fa";
import { AppContext } from "./context/AuthContext.jsx";

function AppContent() {
  const { showModal, updateModal } = useContext(AppContext);

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem("user-info-submitted");
    if (alreadySubmitted) return;

    const timer = setTimeout(() => {
      updateModal(true);
    }, 1000 * 60 * 10);

    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+918112261905";
  const prefilledMessage = encodeURIComponent(
    "Hello! I'm interested in learning more about your products/services. Can you provide more details?"
  );
  const isDesktopApp = navigator.userAgent.includes("WhatsApp");
  const whatsappLink = isDesktopApp
    ? `whatsapp://send?phone=${whatsappNumber}&text=${prefilledMessage}`
    : `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  return (
    <>
      <RouterProvider router={routes} />
      {showModal && <UserInfoModal onClose={() => updateModal(false)} />}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={40} color="white" />
      </a>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Suspense fallback={<div>Loading application...</div>}>
        <AppContent />
      </Suspense>
    </AppProvider>
  );
}

export default App;
