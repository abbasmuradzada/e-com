import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/modules/user/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
