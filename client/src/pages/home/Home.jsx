// import component
import Header from "./component/header/Header.jsx";
import ProductShowcase from "./component/productSections/Sections.jsx";
import Showcase from "./component/showcase/Showcase.jsx";
import Reviews from "./component/reviews/Reviews.jsx";
import FeaturedProduct from "./component/featured/Featured.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import { useGetCategoriesQuery } from '../../services/productsApi.js';


const Home = () => {
  // fetching categories
  const { data: categoriesData } = useGetCategoriesQuery();

  // storing 4 category names (safe check with ?.)
  const categourys = categoriesData
    ? categoriesData.slice(0, 4).map((cat) => cat.name)
    : [];

  console.log(categourys, "categourys");

  return (
    <>
      <Header />
      <SearchBar />
      <ProductShowcase title={categourys[0]} />
      <Showcase />
      <ProductShowcase title="Trending" />
      <FeaturedProduct />
      <ProductShowcase title={categourys[2]} />
      <ProductShowcase title={categourys[3]} />
      <Reviews />
    </>
  );
};

export default Home;