import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import { Icon } from "leaflet";
import "./App.css";

function App() {
  const position = [51.505, -0.09];

  return (
    <Map center={position} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
}

export default App;
