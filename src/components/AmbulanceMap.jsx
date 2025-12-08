import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default Leaflet icon not showing
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const AmbulanceMap = () => {
    const [ambulancePos, setAmbulancePos] = useState([20.5937, 78.9629]); // Initial mock pos
    const patientPos = [20.6000, 78.9700]; // Mock patient pos

    // Simulate movement
    useEffect(() => {
        const interval = setInterval(() => {
            setAmbulancePos(prev => {
                const lat = prev[0] + (patientPos[0] - prev[0]) * 0.05;
                const lng = prev[1] + (patientPos[1] - prev[1]) * 0.05;
                return [lat, lng];
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container" style={{ height: 'calc(100vh - 100px)' }}>
            <div className="card h-full flex flex-col" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid #eee', zIndex: 1000 }}>
                    <h3 style={{ margin: 0 }}>Live Ambulance Tracking</h3>
                    <p style={{ margin: 0, color: 'var(--success)' }}>● Ambulance dispatched • ETA: 12 mins</p>
                </div>

                <MapContainer center={[20.5937, 78.9629]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={ambulancePos}>
                        <Popup>🚑 Ambulance (KA-01-1234)</Popup>
                    </Marker>
                    <Marker position={patientPos}>
                        <Popup>🏥 Patient Location</Popup>
                    </Marker>
                    <Polyline positions={[ambulancePos, patientPos]} color="var(--primary)" dashArray="10, 10" />
                </MapContainer>
            </div>
        </div>
    );
};

export default AmbulanceMap;
