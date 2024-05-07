const request = require("postman-request");

const geoCode = (address, callback) => {
  const mapBoxUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoibmF2ZWVuLXdlYXRoZXIiLCJhIjoiY2x2dWdieGRrMGJndzJpbmVyc3ZpdWh3bCJ9.DpwDd1nm4WTaQk2VOU6UDQ`;
  request(mapBoxUrl, { json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if ((response.body.features.length === 0)) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, {
        lon: response.body.features[0].properties.coordinates.longitude,
        lat: response.body.features[0].properties.coordinates.latitude,
        name: response.body.features[0].properties.name,
      });
    }
  });
};

module.exports = { geoCode };
