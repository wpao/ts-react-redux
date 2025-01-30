import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import CounterPage from "./pages/CounterPage";
import RegisterPage from "./pages/RegisterPage";
import { useHydration } from "./hooks/useHydration";

function App() {
  // melihat location kita saat ini pada url
  const location = useLocation();

  const { isHydrated } = useHydration();
  // akan terloaded jika isHydrated = false
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  // akan terloaded jika isHydrated = true
  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/counter" Component={CounterPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/products/:productId" Component={ProductDetailPage} />

        {/* admin */}
        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>

        {/* 404 */}
        <Route path="*" Component={() => <h1>404</h1>} />
      </Routes>

      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
