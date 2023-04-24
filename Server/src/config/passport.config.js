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
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { authLogin, authGithub } from "../service/auth.service.js";
import usersModel from "../dao/mongo/models/users.models.js";

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
          const user = await users.persistFindUserByEmail(username);
          return done(null, user);
        } catch (error) {
          return done({
            status: "error",
            message: error.message,
            code: error.code,
          });
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (error) {
          return done({
            status: "error",
            message: error.message,
            code: error.code,
          });
        }
      }
    )
  );

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey,
      },
      async (jwt_payload, done) => {
        try {
          console.log(jwt_payload, "paso por aqui?");

          done(null, jwt_payload);
        } catch (error) {
          return done({
            status: "error",
            message: error.message,
            code: error.code,
          });
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
          return done({
            status: "error",
            message: error.message,
            code: error.code,
          });
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
        callbackURL: "http://localhost:8080/auth/githubcallback",
      },
      async (profile, done) => {
        try {
          const user = await authGithub(profile);
          return done(null, user);
        } catch (error) {
          return done({
            status: "error",
            message: error.message,
            code: error.code,
          });
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
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      async (profile, done) => {
        try {
          const user = await authGoogle(profile);
          return done(null, user);
        } catch (error) {
          return done({
            status: "error",
            message: error.message,
            code: error.code,
          });
        }
      }
    )
  );
};

export default initializePassport;
