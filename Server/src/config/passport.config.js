import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import managerFactory from "../factories/manager.factories.js";
import {
  idGithub,
  secretKey,
  secretGithub,
  idGoogle,
  secretGoogle,
} from "./index.config.js";
import jwt, { ExtractJwt } from "passport-jwt";
import { tokenExtractor } from "../utils/tokenExtractor.js";
import { authLogin, authGithub } from "../service/auth.service.js";
import usersModel from "../dao/mongo/models/users.models.js";
import { register } from "../service/users.service.js";

const users = await managerFactory.getManager("users");

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await register(req, password, username);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
        secretOrKey: secretKey,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
        secretOrKey: secretKey,
      },
      async (jwt_payload, done) => {
        try {
          console.log("pasando por aqui!!");
          done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (user, id, done) => {
    const User = await usersModel.findById(id);

    done(null, User);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await authLogin(username, password);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: idGithub,
        clientSecret: secretGithub,
        callbackURL: `https://artfocus-production.up.railway.app/auth/githubcallback`,
      },
      async (profile, done) => {
        try {
          console.log(profile, " este es profile");
          const user = await authGithub(profile);
          console.log(user, "esto es user");
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: idGoogle,
        clientSecret: secretGoogle,
        callbackURL: `https://artfocus-production.up.railway.app/auth/google/callback`,
      },
      async (profile, done) => {
        try {
          console.log(profile, " este es profile");
          const user = await authGoogle(profile);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
