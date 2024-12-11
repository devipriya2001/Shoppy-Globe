import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  // Allow either a string or an array of strings
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => Array.isArray(value) && value.length > 0,
      message: 'Images must be an array with at least one string',
    },
  },
});

export default mongoose.model('Products', productSchema);
