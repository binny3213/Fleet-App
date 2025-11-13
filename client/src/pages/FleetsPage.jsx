import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FleetsPage() {
  const [fleets, setFleets] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/fleets')
      .then((res) => res.json())
      .then(setFleets)
      .catch((err) => setError(err.message));
  }, []);

  const changeSort = (field) => {
    if (field === sortField) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = [...fleets].sort((a, b) => {
    const v1 = a[sortField];
    const v2 = b[sortField];
    if (v1 < v2) return sortDir === 'asc' ? -1 : 1;
    if (v1 > v2) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  if (error) {
    return <div className="page">Error: {error}</div>;
  }

  return (
    <div className="page">
      <h1>Fleets</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => changeSort('name')}>
                Fleet Name {sortField === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => changeSort('vesselsCount')}>
                Vessels Count{' '}
                {sortField === 'vesselsCount' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((f) => (
              <tr
                key={f.id}
                className="clickable-row"
                onClick={() => navigate(`/fleets/${f.id}`)}
              >
                <td>{f.name}</td>
                <td>{f.vesselsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
