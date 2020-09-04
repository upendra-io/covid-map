import { Map, TileLayer, ZoomControl } from "react-leaflet";
import React, { useRef, useEffect } from "react";
import "./Leaflet.css";
import mapEffect from "../../data/countries";

const position = [51.505, -0.09];

export const Leaflet = () => {
  const mapRef = useRef();

  useRefEffect({
    ref: mapRef,
    effect: mapEffect,
  });

  const mapSettings = {
    center: position,
    defaultBaseMap: "OpenStreetMap",
    zoom: 3,
    mapEffect,
  };

  return (
    <Map ref={mapRef} {...mapSettings}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
    </Map>
  );
};

const useRefEffect = ({ effect, ref = {} }) => {
  useEffect(() => {
    effect(ref.current);
  }, [effect, ref]);
};
