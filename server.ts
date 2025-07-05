import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser'; // ✅ MISSING IMPORT

import { userRouter } from './src/modules/user/user.routes';
import { productRouter } from './src/modules/product/product.routes';
import { categoryRouter } from './src/modules/category/category.routes';
import { subCategoryRouter } from './src/modules/sub-category/sub-category.routes';
import { productAttributesRouter } from './src/modules/product-attributes/product-attributes.routes';
import { productSkuRouter } from './src/modules/product-sku/product-sku.routes';
import { cartRouter } from './src/modules/cart/cart.routes';
import { orderRouter } from './src/modules/order/order.routes';
import { stripeWebhookHandler } from './src/modules/payment/webhook.controller';
import { errorsMiddleware } from './src/common/middlewares/errors.middleware';

import './src/config/passport';

const app = express();
const PORT = process.env.PORT || 8000;

app.post(
    '/webhooks/stripe',
    bodyParser.raw({ type: 'application/json' }), // ✅ required for Stripe
    stripeWebhookHandler,
);

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
app.use('/api/product', productRouter);
app.use('/api/product-attributes', productAttributesRouter);
app.use('/api/product-sku', productSkuRouter);
app.use('/api/category', categoryRouter);
app.use('/api/sub-category', subCategoryRouter);
app.use('/api/cart-item', cartRouter);
app.use('/api/order', orderRouter);

app.use(errorsMiddleware);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
