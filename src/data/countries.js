import axios from "axios";
import L from "leaflet";

async function mapEffect({ leafletElement: map } = {}) {
  let response;
  try {
    response = await axios.get("https://corona.lmao.ninja/v2/countries");
  } catch (e) {
    console.log("can't fetch data");
    return;
  }

  const { data = {} } = response;

  const hasData = Array.isArray(data) && data.length > 0;

  if (!hasData) return;

  const geoJson = {
    type: "FeatureCollection",
    features: data.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long: lng } = countryInfo;
      return {
        type: "Feature",
        properties: {
          ...country,
        },
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };
    }),
  };
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, position) => {
      const { properties = {} } = feature;
      let updatedFormatted;
      let casesString;

      const { country, updated, cases, deaths, recovered } = properties;

      casesString = `${cases}`;

      if (cases > 1000000) {
        casesString = `${casesString.slice(0, -6)}M+`;
      } else if (cases > 1000) {
        casesString = `${casesString.slice(0, -3)}K+`;
      }
      if (updated) {
        updatedFormatted = new Date(updated).toLocaleString();
      }

      const html = `
        <span class="marker">
          <span class="marker-tooltip">
            <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${cases}</li>
              <li><strong>Deaths:</strong> ${deaths}</li>
              <li><strong>Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
          </span>
          ${casesString}
        </span>
      `;

      return L.marker(position, {
        icon: L.divIcon({
          className: "icon",
          html,
        }),
        riseOnHover: true,
      });
    },
  });

  geoJsonLayers.addTo(map);
}
export default mapEffect;
