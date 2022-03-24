import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

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
// so that form sent can be transfer into JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// this will run when expressAsyncHandler throws an error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// moved to productRoutes.js file
// app.get('/api/products/slug/:slug', (req, res) => {
//   const product = data.products.find((x) => x.slug === req.params.slug);
//   product
//     ? res.send(product)
//     : res.status(404).send({ message: 'Product Not Found!' });
// });

// app.get('/api/products/:id', (req, res) => {
//   const product = data.products.find((x) => x._id == req.params.id);
//   product
//     ? res.send(product)
//     : res.status(404).send({ message: 'Product Not Found!' });
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
