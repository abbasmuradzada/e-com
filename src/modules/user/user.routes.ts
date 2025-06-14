import { Router } from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import passport from 'passport';

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/register', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));

userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/users/failure',
        session: false,
    }),
    userController.googleAuthSuccess.bind(userController),
);

userRouter.get('/failure', userController.googleAuthFailure.bind(userController));

export { userRouter };
