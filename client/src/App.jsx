import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import UserInfoModal from "./components/authentication/UserInfo.jsx";
import "./App.css";

import { routes } from "./routes/Route.jsx";
import { AppProvider } from "./context/AuthContext.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem("user-info-submitted");
    if (alreadySubmitted) return;

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000 * 10); // 10 minutes

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <Suspense>
        <RouterProvider router={routes} />
        {showModal && <UserInfoModal onClose={() => setShowModal(false)} />}
      </Suspense>
    </AppProvider>
  );
}

export default App;
