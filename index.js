"use strict";

const express = require("express");
const app = express();

app.get("/math/circle/:r", (req, res) => {
  const r = parseFloat(req.params.r);
  if (isNaN(r) || r < 0) {
    return res.status(400).json({ error: "Invalid radius value" });
  }

  const area = (Math.PI * r * r).toFixed(2);
  const circumference = (2 * Math.PI * r).toFixed(2);

  const result = {
    area: area,
    circumference: circumference
  };

  res.json(result);
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  if (isNaN(width) || width < 0 || isNaN(height) || height < 0) {
    return res.status(400).json({ error: "Invalid width or height value" });
  }

  const area = width * height;
  const perimeter = 2 * (width + height);

  const result = {
    area: area,
    perimeter: perimeter,
  };

  res.json(result);
});


app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = Math.pow(base, exponent);

  if (req.query.root === "true") {
    const root = Math.sqrt(base);
    return res.json({ result: result, root: root });
  } else {
    return res.json({ result: result });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
