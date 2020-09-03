import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import React from "react";
import "./Leaflet.css";
import mapEffect from "./../../data/countries";

mapEffect();

const position = [51.505, -0.09];

export const Leaflet = () => {
  return (
    <Map center={position} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
};
