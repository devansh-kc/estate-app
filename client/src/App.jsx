import "./layout.scss";
import Navbar from "./components/navbar/navbar.jsx";
import Homepage from "./routes/homepage/Homepage.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
