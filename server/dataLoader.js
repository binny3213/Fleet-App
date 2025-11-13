const fs = require('fs');
const path = require('path');

function loadJson(name) {
  const filePath = path.join(__dirname, 'data', name);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const vessels = loadJson('vessels.json');
const fleets = loadJson('fleets.json');
const vesselLocations = loadJson('vesselLocations.json');

const vesselsById = new Map(vessels.map(v => [v._id, v]));
const locationsById = new Map(vesselLocations.map(l => [l._id, l]));
const fleetsById = new Map(fleets.map(f => [f._id, f]));

module.exports = {
  vessels,
  fleets,
  vesselLocations,
  vesselsById,
  locationsById,
  fleetsById,
};