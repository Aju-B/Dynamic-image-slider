const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

// Replace with your own secret in real projects!
const JWT_SECRET = 'secret_key_for_demo';

// --- Models ---
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  images: [String],
  category: String,
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: Object,
    qty: Number
  }],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// --- Express App ---
const app = express();
app.use(cors());
app.use(express.json());

// --- Connect to MongoDB ---
mongoose.connect(
  'mongodb+srv://abiabi9486842923_db_user:abi@cluster0.k4uyqp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Mongo Error:', err));

// --- Middleware to Protect Routes ---
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Wrong or expired token' });
  }
}

// --- AUTH ROUTES ---

// Registration with password hashing
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ msg: 'Account created', user: { name, email } });
  } catch (err) {
    res.status(400).json({ msg: 'Email already in use or bad request', err: err.message });
  }
});

// Login with password verification
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: 'Wrong email or password' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ msg: 'Wrong email or password' });

  const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ msg: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email } });
});

// --- PRODUCT ROUTES (CRUD) ---
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const prod = await Product.findById(req.params.id);
  prod ? res.json(prod) : res.status(404).json({ msg: 'Not found' });
});

app.post('/api/products', authMiddleware, async (req, res) => {
  const prod = await Product.create(req.body);
  res.json(prod);
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(prod);
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

// --- CART & ORDER ENDPOINTS ---
app.post('/api/orders', authMiddleware, async (req, res) => {
  const { items, total } = req.body;
  const userId = req.user.id;
  const order = await Order.create({ user: userId, items, total });
  res.json(order);
});

app.get('/api/orders', authMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

app.delete('/api/orders/:id', authMiddleware, async (req, res) => {
  await Order.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'Order cancelled' });
});

// --- START SERVER ---
app.listen(5500, () => console.log('IBM Store backend running on http://localhost:5500'));
