import React from "react";

// import component
import Header from "./component/header/Header.jsx";
import ProductShowcase from "./component/productSections/Sections.jsx";
import Showcase from "./component/showcase/Showcase.jsx";
import Reviews from "./component/reviews/Reviews.jsx";
import FeaturedProduct from "./component/featured/Featured.jsx";
import SearchBar from "../../components/SearchBar.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <ProductShowcase title="Mobile Accessories" />
      <Showcase />
      <ProductShowcase title="Trending" />
      <FeaturedProduct />
      <ProductShowcase title="Baby Products" />
      <ProductShowcase title="Vintage Table Clocks" />
      <Reviews />
    </>
  );
};

export default Home;
