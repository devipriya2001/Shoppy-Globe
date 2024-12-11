import express from 'express';
import mongoose from 'mongoose';
import Products from '../models/Product.js';

const router = express.Router();

// **GET** all products
router.get('/', async (req, res) => {
  try {
    const products = await Products.find(); // Fetch all products from DB
    res.status(200).json(products); // Return all products as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// **GET** product by MongoDB `_id`
router.get('/:id', async (req, res) => {

  const { id } = req.params;
  const product = await Products.findById(req.params.id);

  // Validate ID before querying the database
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    // Use the _id field to find a product
    const product = await Products.findById(id); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // If product not found
    }
    res.status(200).json(product); // Return the found product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// POST route for creating a new product
router.post('/', async (req, res) => {
  try {
    const { title, price, description, stock, images } = req.body;

    // Ensure images is always an array
    const formattedImages = Array.isArray(images) ? images : [images];

    const newProduct = new Products({
      title,
      price,
      description,
      stock,
      images: formattedImages,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// **PUT** update an existing product by MongoDB `_id`
router.put('/:id', async (req, res) => {

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id, // MongoDB _id
    { title, price, description, stock }, // Fields to update
    { new: true } // Return the updated document
  );
  
  try {
    const { title, price, description, stock } = req.body;

    // Use the _id to update the product in the database
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id, // MongoDB _id
      { title, price, description, stock }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' }); // Product not found
    }

    res.status(200).json(updatedProduct); // Return the updated product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// **DELETE** a product by MongoDB `_id`
router.delete('/:id', async (req, res) => {

  const deletedProduct = await Products.findByIdAndDelete(req.params.id);

  try {
    // Use the _id to delete the product from the database
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' }); // Product not found
    }

    res.status(200).json({ message: 'Product deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

export default router;
