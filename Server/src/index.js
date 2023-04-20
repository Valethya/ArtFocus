import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { mongoConect } from "./db/index.db.js";
import cors from "cors";
import router from "./router/index.router.js";
import initializePassport from "./config/passport.config.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import { passSession } from "./config/index.config.js";
import { mongoUri } from "./db/index.db.js";
import handlerError from "./middleware/handleError.js";
console.log("inciando index.js");
export const app = express();

/*--EXPRESS--*/
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: mongoUri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 120,
    }),
    secret: passSession,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*--CORS--*/

app.use(cors({ origin: "http://127.0.0.1:5173" }));

/*--PASSPORT--*/

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/*--COOKIES--*/

app.use(cookieParser());

app.use(morgan("dev"));

router(app);

app.use(handlerError);
