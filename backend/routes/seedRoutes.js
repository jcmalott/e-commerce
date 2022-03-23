import express from 'express';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({}); //empty out the DB
  const createProducts = await Product.insertMany(data.products);

  await User.remove({});
  const createUsers = await User.insertMany(data.users);
  res.send({ createProducts, createUsers }); //send to frontend
});

export default seedRouter;
