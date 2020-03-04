import passport from 'passport';
import LocalStrategy from 'passport-local';
import CustomerCtrl from '../controllers/customer';

const auth = {};

const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
};

const cb = async (req, email, password, done) => {
    const { customer, isPassword }  = await CustomerCtrl.apiVerifyPassword(email, password);
    if (isPassword) done(null, customer);
    else done(null, false);
};

const localStrategy = new LocalStrategy(options, cb);
passport.use(localStrategy);

passport.serializeUser((customer, done) => {
    done(null, customer.id);
});

auth.initialize = () => {
    return passport.initialize();
};

auth.authenticate = () => {
    return passport.authenticate('local');
};

export default auth;
