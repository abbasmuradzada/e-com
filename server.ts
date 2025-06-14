import dotenv from 'dotenv';
dotenv.config()
import express, { ErrorRequestHandler } from 'express';
import { userRouter } from './src/modules/user/user.routes';
import { errorHandler } from './src/common/middlewares/errors';
import session from 'express-session';
import passport from 'passport';
import './src/config/passport';

;

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRouter);
app.use(errorHandler);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
