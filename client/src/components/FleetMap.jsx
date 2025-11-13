import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function FleetMap({ vessels }) {
  const vesselsWithLocation = vessels.filter(
    (v) =>
      v.location &&
      v.location.lastpos &&
      v.location.lastpos.geometry &&
      Array.isArray(v.location.lastpos.geometry.coordinates)
  );

  const center =
    vesselsWithLocation.length > 0
      ? [
          vesselsWithLocation[0].location.lastpos.geometry.coordinates[1],
          vesselsWithLocation[0].location.lastpos.geometry.coordinates[0],
        ]
      : [0, 0];

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vesselsWithLocation.map((v) => {
          const [lon, lat] = v.location.lastpos.geometry.coordinates;

          return (
            <Marker
              key={v._id}
              position={[lat, lon]}
              icon={defaultIcon}
            >
              <Popup>
                <strong>{v.name}</strong><br />
                MMSI: {v.mmsi || 'N/A'}<br />
                Flag: {v.flag || 'N/A'}<br />
                Lat: {lat.toFixed(3)}, Lon: {lon.toFixed(3)}<br />
                Timestamp: {v.location.lastpos.ts}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
