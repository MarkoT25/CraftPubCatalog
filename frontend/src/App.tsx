import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/RootLayout/RootLayout";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/AuthProtection/ProtectedRoute";
import { PublicRoute } from "./components/AuthProtection/PublicRoute";
import { Beers } from "./pages/Beers/Beers";
import { Breweries } from "./pages/Breweries/Breweries";
import { Cart } from "./pages/Cart/Cart";
import { Favorites } from "./pages/Favorites/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="beers"
          element={
            <ProtectedRoute>
              <Beers />
            </ProtectedRoute>
          }
        />
        <Route
          path="breweries"
          element={
            <ProtectedRoute>
              <Breweries />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
