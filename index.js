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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
