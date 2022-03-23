import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
  // .connect(process.env.MONGODB_URI) // atlas
  .connect(process.env.MONGODB_LOCAL_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log('Error: ' + err.message);
  });

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  product
    ? res.send(product)
    : res.status(404).send({ message: 'Product Not Found!' });
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id == req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: 'Product Not Found!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
