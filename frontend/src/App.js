import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import Home from "./components/layout/Home.js";
import Login from "./components/user/Login.js";
import ProductDetails from "./components/product/ProductDetails.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../src/components/user/Register.js";

import store from "../src/redux/store.js";
import { loadUser } from "../src/redux/features/user/userThunks.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" Component={ProductDetails} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
