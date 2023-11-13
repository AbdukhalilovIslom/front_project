import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Aside from "./components/Aside/Aside";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import MyItems from "./pages/Profile/MyItems/MyItems";
import MyCollections from "./pages/Profile/MyCollections/MyCollections";

function App() {
  return (
    <div className="app">
      <Aside />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />}>
            <Route index path="collections" element={<MyCollections />} />
            <Route path="collection/items/:params" element={<MyItems />} />
          </Route>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
