const Product = require('../models/product');
const Api404Error = require('../middleware/api404Error');

exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Api404Error(`Product with ID ${req.params.id} not found`);
  }
  res.status(200).json(product);
};

exports.create = async (req, res) => {
  const product = new Product(req.body);
  const newProduct = await product.save();
  res.status(201).json(newProduct);
};

exports.update = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updatedProduct) {
    throw new Api404Error(`Product with ID ${req.params.id} not found`);
  }
  res.status(200).json(updatedProduct);
};

exports.delete = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw new Api404Error(`Product with ID ${req.params.id} not found`);
  }
  res.status(200).json({ message: 'Product deleted' });
};