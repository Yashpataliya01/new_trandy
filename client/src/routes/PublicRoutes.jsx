import { lazy } from "react";
import Public from "../layout/Layout.jsx";
import ContactPage from "../pages/contact/Contact.jsx";
import Login from "../components/authentication/Login.jsx";
import Cart from "../pages/cart/Cart.jsx";
import Wishlist from "../pages/wishlist/Wishlist.jsx";
import About from "../pages/about/About.jsx";
import ReturnPolicy from "../pages/return/Return.jsx";
import Faq from "../pages/faq/Faq.jsx";

const Home = lazy(() => import("../pages/home/Home.jsx"));
const Product = lazy(() => import("../pages/products/Product.jsx"));
const DetailProduct = lazy(() =>
  import("../pages/products/component/DetailProduct.jsx")
);
const Buyandsell = lazy(() => import("../pages/buyandsell/Buyandsell.jsx"));

export const publicRoutes = [
  {
    path: "/",
    element: <Public />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/products/:id",
        element: <DetailProduct />,
      },
      {
        path: "/buysell",
        element: <Buyandsell />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/faqs",
        element: <Faq />,
      },
    ],
  },
];
