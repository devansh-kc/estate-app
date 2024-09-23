import "./layout.scss";
import Navbar from "./components/navbar/navbar";
import Homepage from "./routes/homepage/Homepage.jsx";
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
