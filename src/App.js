import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyBusiness from "./component/myBusiness/myBusiness";
import Home from "./index"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myBusiness" element={<MyBusiness />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
