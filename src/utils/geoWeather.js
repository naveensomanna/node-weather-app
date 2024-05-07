const request = require("postman-request");




const geoWeather = ({lat,lon}, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ee59f99bbed5b548dfdc3984c805265c&units=metric`;
  request(url, { json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else {
      let foreCast=response.body.weather[0].description+" It is currently "+response.body.main.temp+" degrees out."+ "And it feels like "+response.body.main.feels_like
      callback(undefined, {foreCast,location:response.body.name});
    }
  });
};

module.exports = { geoWeather };
