import React from "react";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/navigation/Navbar.jsx";
import Footer from "../components/navigation/Footer.jsx";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Suspense>
  );
};

export default Layout;
