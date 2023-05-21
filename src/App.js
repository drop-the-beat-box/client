import {BrowserRouter as Router, Route, Routes, useRoutes} from "react-router-dom";
import Layout from './components/Layout';
import './App.css';
import './assets/css/body.css';
import './assets/css/header.css';
import './assets/css/sidebar.css';
import './assets/css/footer.css';
import './assets/css/layout.css';
import './assets/css/sidebarbutton.css';
import './assets/css/bodytopbutton.css';
import './assets/css/filterbutton.css';
import MainPage from './pages/MainPage';
import MyFilePage from "./pages/MyFilePage";
import SharingPage from "./pages/SharingPage";
import SharingFilePage from "./pages/SharingFilePage";
import TrashFilePage from "./pages/TrashFilePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element= {<MainPage/>}/>
          <Route path="/mainpage" element= {<MainPage/>}/>
          <Route path="/myfilepage" element= {<MyFilePage/>}/>
          <Route path="/sharingpage" element= {<SharingPage/>}/>
          <Route path="/sharingfilepage" element= {<SharingFilePage/>}/>
          <Route path="/trashfilepage" element= {<TrashFilePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
