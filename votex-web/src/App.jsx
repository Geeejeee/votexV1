// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Voters from "./pages/voters";
import ElectionsDashboard from "./pages/elections";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/voters" element={<Voters />} />
        <Route path="/elections" element={<ElectionsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;