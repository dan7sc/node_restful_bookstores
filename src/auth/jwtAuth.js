import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import CustomerCtrl from '../controllers/customer';

const jwtAuth = {};

const options = {
    secretOrKey: process.env.TOKEN_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: false
};

const verifyToken = async (payload, done) => {
    const { customer, error } = await CustomerCtrl.apiGetCustomerByEmail(payload.email);
    if (error) done(error, false);
    else if (customer) done(null, customer);
    else done(null, false);
};

const jwtStrategy = new Strategy(options, verifyToken);
passport.use(jwtStrategy);

passport.serializeUser((customer, done) => {
    done(null, customer.id);
});

jwtAuth.authenticate = () => {
    return passport.authenticate('jwt', { session: false });
};

export default jwtAuth;
