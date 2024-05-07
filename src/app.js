const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoCode } = require("./utils/geoCode");
const { geoWeather } = require("./utils/geoWeather");

const app = express();

// Define path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewPaths = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bars engines
app.set("view engine", "hbs");
app.set("views", viewPaths);
hbs.registerPartials(partialsPath);

// Setup static directories to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Naveen",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter address query",
    });
  }

  geoCode(req.query.address, (err, { lon, lat } = {}) => {
    if (err) {
      return res.send({ err });
    }

    geoWeather({ lat, lon }, (error, { foreCast, location } = {}) => {
      if (error) {
        return res.send({ err });
      }
      res.send({
        foreCast,
        location,
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Naveen",
  });
});

app.get("*", (err, res) => {
  res.render("notFound", {});
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
