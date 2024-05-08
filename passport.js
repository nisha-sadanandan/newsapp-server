import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './model/userModel.js';
import 'dotenv/config'

const secret_key = process.env.JWT_SECRET_KEY
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'reactblogapp' // Replace with your secret key
  };

  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {

        console.log(jwtPayload)
      const user = await User.findOne({email:jwtPayload.user});
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));

  export default passport;