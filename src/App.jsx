import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsDetailPage from "./pages/ProductsDetailPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductsDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

    </Routes>
    <Toaster position="bottom-center" reverseOrder={false} />
  </>
  );
}

export default App;
