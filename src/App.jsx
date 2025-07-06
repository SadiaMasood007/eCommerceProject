import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsDetailPage from "./pages/ProductsDetailPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";

function App() {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductsDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  </>
  );
}

export default App;
