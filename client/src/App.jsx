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
    }, 1000 * 60 * 3);

    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+919571717571";
  const prefilledMessage = encodeURIComponent(
    "Hi TMP Team! I saw products on your website and want to know more. Please assist me."
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
