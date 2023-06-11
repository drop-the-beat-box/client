import { BrowserRouter as Router, Route, Routes, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import "./assets/css/body.css";
import "./assets/css/header.css";
import "./assets/css/sidebar.css";
import "./assets/css/footer.css";
import "./assets/css/layout.css";
import "./assets/css/sidebarbutton.css";
import "./assets/css/bodytopbutton.css";
import "./assets/css/following.css";
import "./assets/css/searchmember.css";
import "./assets/css/popupmenu.css";
import "./assets/css/followconfirm.css";
import "./assets/css/filterbutton.css";
import "./assets/css/loginpage.css";
import MainPage from "./pages/MainPage";
import MyFilePage from "./pages/MyFilePage";
import SharingPage from "./pages/SharingPage";
import SharingFilePage from "./pages/SharingFilePage";
import Trashcan from "./pages/Trashcan";
import LoginPage from "./pages/LoginPage";
import KakaoLogin from "./components/logins/KakaoLogin";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/mainpage"
            element={<MyFilePage />}
          />
          <Route
            path="/myfilepage"
            element={<MyFilePage />}
          />
          <Route
            path="/sharingpage"
            element={<SharingPage />}
          />
          <Route
            path="/sharingfilepage/*"
            element={<SharingFilePage />}
          />
          <Route
            path="/trashcan"
            element={<Trashcan />}
          />
          <Route
            path="/token"
            element={<KakaoLogin />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
