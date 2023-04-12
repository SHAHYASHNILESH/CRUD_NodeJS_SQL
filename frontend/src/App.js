import logo from "./logo.svg";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <h1>Hello React</h1>
        <Routes>
          <Route exact path='/' Component={Home}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
