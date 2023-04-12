import logo from "./logo.svg";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <h1>Hello React</h1>
        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route path='/addemployee' Component={AddEdit}/>
          <Route path='/update/:id' Component={AddEdit}/>
          <Route path='/view/:id' Component={View}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
