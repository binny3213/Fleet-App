import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FleetMap from '../components/FleetMap.jsx'; 

export default function FleetPage() {
  const { fleetId } = useParams();
  const [vessels, setVessels] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: '', mmsi: '', flag: '' });
  const [selectedVessel, setSelectedVessel] = useState(null);

  useEffect(() => {
    fetch(`/api/fleets/${fleetId}/vessels`)
      .then((res) => res.json())
      .then((data) => {
        setVessels(data);
        setDisplayed(data);
        setSelectedVessel(null);
      })
      .catch((err) => setError(err.message));
  }, [fleetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const any = Object.values(filters).some((v) => v.trim() !== '');
    if (!any) {
      setDisplayed(vessels);
      setSelectedVessel(null);
      return;
    }
    const params = new URLSearchParams({ fleetId });
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });

    fetch(`/api/vessels/search?${params.toString()}`)
      .then((res) => res.json())
      .then(setDisplayed)
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <div className="page">Error: {error}</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Fleet {fleetId}</h1>
        <Link to="/" className="back-link">
          ← Back to Fleets
        </Link>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-field">
          <label>Name</label>
          <input
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Vessel name"
          />
        </div>
        <div className="search-field">
          <label>MMSI</label>
          <input
            name="mmsi"
            value={filters.mmsi}
            onChange={handleChange}
            placeholder="MMSI"
          />
        </div>
        <div className="search-field">
          <label>Flag</label>
          <input
            name="flag"
            value={filters.flag}
            onChange={handleChange}
            placeholder="Flag"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      <div className="card">
        <h2>Vessels</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>MMSI</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((v) => (
              <tr
                key={v._id}
                onClick={() => setSelectedVessel(v)}  
                className={selectedVessel && selectedVessel._id === v._id ? 'selected-row' : ''}
              >
                <td>{v.name}</td>
                <td>{v.mmsi || '—'}</td>
                <td>{v.flag || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayed.length === 0 && <p>No vessels match your search.</p>}
      </div>

      <div className="card">
        <h2>Map</h2>
        <FleetMap vessels={displayed} selectedVessel={selectedVessel} />
      </div>
    </div>
  );
}
