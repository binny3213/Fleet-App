const BASE_URL = 'http://localhost:5000/api';

export async function getFleets() {
  const res = await fetch(`${BASE_URL}/fleets`);
  return res.json();
}

export async function getFleetVessels(fleetId) {
  const res = await fetch(`${BASE_URL}/fleets/${fleetId}/vessels`);
  return res.json();
}

export async function searchFleetVessels(fleetId, filters) {
  const params = new URLSearchParams({ fleetId });
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.append(k, v);
  });
  const res = await fetch(`${BASE}/vessels/search?${params.toString()}`);
  return res.json();
}
