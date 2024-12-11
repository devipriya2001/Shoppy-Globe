import express from 'express';
import Cart from '../models/Cart.js';
import Products from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add Product to Cart (POST /cart)
router.post('/', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    // Find product details from the Products collection
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { title, price } = product;

    // Find or create a cart
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, title, price, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (productIndex === -1) {
        cart.items.push({ productId, title, price, quantity });
      } else {
        cart.items[productIndex].quantity += quantity;
      }
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Remove product from the cart (DELETE /cart)
router.delete('/', authenticateToken, async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.items.splice(productIndex, 1);

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch cart for a user (GET /cart)
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Find cart for the logged-in user
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(200).json([]); // Return an empty array if no items
    }

    res.status(200).json(cart.items); // Return the cart items
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Update product quantity in the cart (PUT /cart)
router.put('/', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate request payload
  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the product quantity
    cart.items[productIndex].quantity = quantity;

    // Save updated cart
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
