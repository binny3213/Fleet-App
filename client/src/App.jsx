import { Routes, Route, Link } from 'react-router-dom';
import FleetsPage from './pages/FleetsPage.jsx';
import FleetPage from './pages/FleetPage.jsx';

function App() {
  return (
    <div className="app">
      <header className="top-bar">
        <Link to="/" className="logo">
          Fleet Monitor
        </Link>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<FleetsPage />} />
          <Route path="/fleets/:fleetId" element={<FleetPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
