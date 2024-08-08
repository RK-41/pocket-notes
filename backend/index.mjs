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
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
	cors({
		origin: `${process.env.FRONTEND_URL}`,
	})
);
app.use('/api', groupRoutes);

// API Handling
app.get('/', (req, res) => {
	res.json({ data: 'hey..' });
});

app.post('/add-note', async (req, res) => {});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app;
