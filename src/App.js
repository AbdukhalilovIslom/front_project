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
import { useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "dark");

  const admin =
    (sessionStorage.getItem("user") &&
      JSON.parse(sessionStorage.getItem("user")).role === "admin") ||
    false;

  const isAuth = !!sessionStorage.getItem("token");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  paper: "#000",
                },
              }
            : {}),
        },
        components: {
          MuiDialog: {
            styleOverrides: {
              root: {
                paper: { backgroundImage: "unset" },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="app" data-theme={mode}>
        <Aside setTheme={setMode} />
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
            {!isAuth && (
              <Route path="/registration" element={<Registration />} />
            )}
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
