import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateRoom, DashBoard, RPS } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<DashBoard />} />
          <Route path="/dashboard" exact element={<DashBoard />} />
          <Route path="/games/room" exact element={<CreateRoom />} />
          <Route path="/games/rps/:id" exact element={<RPS />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
