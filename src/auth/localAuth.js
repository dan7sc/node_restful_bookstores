import passport from 'passport';
import LocalStrategy from 'passport-local';
import CustomerCtrl from '../controllers/customer';

const localAuth = {};

const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
    session: false
};

const verifyCustomer = async (email, password, done) => {
    const { customer, isPassword, error }  = await CustomerCtrl.apiVerifyPassword(email, password);
    if (error) done(error, false);
    else if (isPassword) done(null, customer);
    else done(null, false);
};

const localStrategy = new LocalStrategy(options, verifyCustomer);
passport.use(localStrategy);

localAuth.authenticate = () => {
    return passport.authenticate('local', { session: false });
};

export default localAuth;
