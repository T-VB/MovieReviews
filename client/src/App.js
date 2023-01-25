import "./App.css";
import CreateMovie from "./components/CreateMovie";
import DisplayAll from "./components/DisplayAll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import OneMovie from "./components/OneMovie";
import UpdateMovie from "./components/UpdateMovie";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateReview from "./components/CreateReview";

function App() {
  return (
    <div className="App">
      {/* <CreateMovie /> */}
      {/* <DisplayAll /> */}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/createMovie" element={<CreateMovie />} />
          <Route path="/displayAll" element={<DisplayAll />} />
          <Route path="/oneMovie/:id" element={<OneMovie />} />
          <Route path="/updateMovie/:id" element={<UpdateMovie />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createReview" element={<CreateReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
