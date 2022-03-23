import express from 'express';
import Product from '../models/ProductModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({}); //empty out the DB

  const createProducts = await Product.insertMany(data.products);
  res.send({ createProducts }); //send to frontend
});

export default seedRouter;
