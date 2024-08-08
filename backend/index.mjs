import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import groupRoutes from './routes/groupRoutes.js';

dotenv.config();

// MongoDB Connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('🍃MongoDB connected'))
	.catch((err) => console.error('💥MongoDB connection error:', err));

// Express App
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use('/api', groupRoutes);

// API Handling
app.get('/', (req, res) => {
	res.json({ data: 'hey..' });
});

app.post('/add-note', async (req, res) => {});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});

export default app;
