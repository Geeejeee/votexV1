// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Voters from "./pages/voters";
import ElectionsDashboard from "./pages/elections";
import ResultsDashboard from "./pages/resultsdb";
import ElectionResultsView from "./pages/viewresults";
import ElectionCandidatesView from "./pages/candidates";
import VotersListPage from "./pages/viewvoterslist";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/voters" element={<Voters />} />
        <Route path="/elections" element={<ElectionsDashboard />} />
        <Route path="/resultsdb" element={<ResultsDashboard />} />
        <Route path="/elections/:electionId/candidates" element={<ElectionCandidatesView />} />
        <Route path="/elections/:electionId/positions/:positionId/voters" element={<VotersListPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />


        {/* Election Results Page */}
        <Route path="/resultsdb/:electionId" element={<ElectionResultsView />} />
      </Routes>
    </Router>
  );
}

export default App;