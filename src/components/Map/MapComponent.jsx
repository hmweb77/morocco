'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png'
  
})

const MapGlobal = ({ cities, onCitySelect }) => {
  // Morocco's approximate center coordinates
  const center = [31.7917, -7.0926]
  
  return (
    <MapContainer 
      center={center} 
      zoom={6} 
      style={{ height: '100%', width: '100%', borderRadius: '16px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {cities.map(city => (
        <Marker 
          key={city.id} 
          position={[city.lat, city.lng]}
          eventHandlers={{
            click: () => onCitySelect(city)
          }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">{city.name}</h3>
              <p className="text-sm">{city.topPick}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapGlobal