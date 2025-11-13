const express = require('express');
const cors = require('cors');
const { fleets, vesselsById, locationsById } = require('./dataLoader');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/fleets', (req, res) => {
  const result = fleets.map((f) => ({
    id: f._id,
    name: f.name,
    vesselsCount: f.vessels.length,
  }));
  res.json(result);
});


app.get('/api/fleets/:id/vessels', (req, res) => {
  const fleetId = req.params.id;
  const fleet = fleets.find((f) => f._id === fleetId);

  if (!fleet) {
    return res.status(404).json({ message: 'Fleet not found' });
  }

  const vessels = fleet.vessels
    .map((item) => {
      const vessel = vesselsById.get(item._id);
      if (!vessel) return null;
      const location = locationsById.get(item._id);
      return { ...vessel, value: item.value, location };
    })
    .filter(Boolean);

  res.json(vessels);
});


app.get('/api/vessels/search', (req, res) => {
  const { name, flag, mmsi, fleetId } = req.query;

  const fleet = fleets.find((f) => f._id === fleetId);
  if (!fleet) {
    return res.json([]); 
  }

  let list = fleet.vessels
    .map((item) => vesselsById.get(item._id))
    .filter(Boolean);

  if (name) {
    const n = name.toLowerCase();
    list = list.filter(
      (v) => v.name && v.name.toLowerCase().includes(n)
    );
  }

  if (flag) {
    const f = flag.toLowerCase();
    list = list.filter(
      (v) => v.flag && v.flag.toLowerCase().includes(f)
    );
  }

  if (mmsi) {
    const m = String(mmsi);
    list = list.filter((v) =>
      String(v.mmsi || '').includes(m)
    );
  }

  res.json(list); 
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
