import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsDetailPage from "./pages/ProductsDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductsDetailPage />} />
    </Routes>

  );
}

export default App;
