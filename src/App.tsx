import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import RegistrarPage from "./components/RegistrarPage";
import FetchMember from "./components/FetchMember"; // Ensure correct casing
import Navbar from "./components/navigation";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<RegistrarPage />} />
        <Route path="/fetch-member" element={<FetchMember />} /> {/* Add the route for FetchMember */}
      </Routes>
    </Router>
  );
}

export default App;
