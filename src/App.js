import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Aside from "./components/Aside/Aside";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import MyItems from "./pages/Profile/MyItems/MyItems";
import MyCollections from "./pages/Profile/MyCollections/MyCollections";
import Collections from "./pages/Collections/Collections";
import Items from "./pages/Items/Items";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./pages/Users/Users";

function App() {
  const admin =
    (sessionStorage.getItem("user") &&
      JSON.parse(sessionStorage.getItem("user")).role === "admin") ||
    false;

  const isAuth = !!sessionStorage.getItem("token");

  return (
    <div className="app">
      <Aside />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/items/:id" element={<Items />} />
          {admin && <Route path="/admin" element={<Users />} />}
          {isAuth ? (
            <Route path="/profile" element={<Profile />}>
              <Route index path="collections" element={<MyCollections />} />
              <Route path="collection/items/:params" element={<MyItems />} />
            </Route>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          {!isAuth && <Route path="/registration" element={<Registration />} />}
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
