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

app.get('/math/isprime/:n', (req, res) => {
  const n = parseInt(req.params.n, 10);

  if (isNaN(n) || n < 2) {
    return res.status(400).json({ error: 'Invalid input' });
  }

 
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  const primeCheck = isPrime(n);

  res.json({ number: n, isPrime: primeCheck });
});



app.get('/math/gcdlcm/:a/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  
  function gcd(x, y) {
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }


  function lcm(x, y) {
    return (x * y) / gcd(x, y);
  }

  const gcdValue = gcd(a, b);
  const lcmValue = lcm(a, b);

  res.json({ gcd: gcdValue, lcm: lcmValue });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
