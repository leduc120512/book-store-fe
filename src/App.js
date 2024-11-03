import React from "react";
import { Routes, Route } from "react-router-dom"; // Không cần BrowserRouter ở đây
import Data_login from "./compodens/Layout/DefaultLayout/Login-LogOUT/LogIN/data";
import Cart_buggert from "./compodens/Layout/Cart-buggest";
import Confirm from "./compodens/Layout/DefaultLayout/Login-LogOUT/LogIN/confirm";
import DefaultLayout from "./compodens/Layout/DefaultLayout";
import Content from "../src/compodens/Layout/DefaultLayout/content";
import List_book from "./pages/list-book-item";
import Sugest from "./pages/suggest-book";
import Item_book from "../src/compodens/Layout/DefaultLayout/book-item";
import Login_Logut from "./compodens/Layout/DefaultLayout/Login-LogOUT";
import LogOut from "./compodens/Layout/DefaultLayout/Login-LogOUT/LogOut";
import BuyNowComponent from "./compodens/Layout/DefaultLayout/Buy-one";
import Buy_pay from "./compodens/Layout/DefaultLayout/Buy-now-butoon";
import Profile from "./pages/profile";
import Accountmanagement from "../src/compodens/admin/accountmanagement";
import Bieudo from "../src/compodens/admin";
import L1 from "./pages/chiu";
import List_book_catacory from "./pages/list_book-catacory";
import List_book_product from "./pages/list_book_product";
import Admin from "../src/compodens/admin";
import { SelectedProductsProvider } from "./compodens/Layout/DefaultLayout/Buy-one/SelectedProductsContext/SelectedProductsContext";
import List_book_catVVacory from "./pages/list-book-item";

function App() {
  return (
    <SelectedProductsProvider>
      <div className="App">
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Content />} />
            <Route
              path="categoryName/:categoryName"
              element={<List_book_catacory />}
            />
            <Route
              path="/search/:productName"
              element={<List_book_product />}
            />
            <Route path="list_book" element={<Item_book />} />
            <Route path="book/:productId" element={<Item_book />} />
            <Route path="Cart" element={<Cart_buggert />} />
            <Route path="/BUY" element={<BuyNowComponent />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Sugest" element={<Sugest />} />
            <Route path="FRIEND" element={<List_book_catVVacory />} />
          </Route>

          {/* Login-Logout routes */}
          <Route path="LOGIN" element={<Login_Logut />}>
            <Route index element={<LogOut />} />
            <Route path="LogIn" element={<Data_login />} />
            <Route path="LogIn/Confirm" element={<Confirm />} />
          </Route>
          <Route path="admin" element={<Admin />} />
          {/* Other routes */}
          <Route path="Buy_pay" element={<Buy_pay />} />
          <Route path="Table" element={<Bieudo />} />
          <Route path="Usecontext" element={<Accountmanagement />} />
        </Routes>
      </div>
    </SelectedProductsProvider>
  );
}

export default App;
