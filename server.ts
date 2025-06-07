import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import { userRouter } from './src/modules/user/user.routes';
import { errorHandler } from './src/common/middlewares/errors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api/users', userRouter);
app.use(errorHandler);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
