import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRepository } from '../modules/user/user.repository';

const userRepository = new UserRepository();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
            scope: ['profile', 'email'],
        },
        async (accessToken: string, refreshToken: string, profile, done) => {
            try {
                const email = profile.emails?.[0].value;
                if (!email) {
                    return done(new Error('No email found in Google profile'));
                }

                let user = await userRepository.findByGoogleId(profile.id);

                if (!user) {
                    user = await userRepository.findByEmail(email);
                    if (user) {
                        user = await userRepository.updateUser(user.id, {
                            googleId: profile.id,
                            isEmailVerified: true,
                        });
                    } else {
                        user = await userRepository.create({
                            email,
                            name: profile.displayName,
                            googleId: profile.id,
                            passwordHash: '',
                            isEmailVerified: true,
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error);
            }
        },
    ),
);

// Serialize/Deserialize user
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userRepository.findById(id);
        done(null, user);
    } catch (error) {
        done(error as Error);
    }
});
