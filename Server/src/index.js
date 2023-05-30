import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./router/index.router.js";
import initializePassport from "./config/passport.config.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import { passSession } from "./config/index.config.js";
import { mongoUri } from "./db/index.db.js";
import handleError from "./middleware/handleError.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import addLogger from "./middleware/logger.midleware.js";
import __dirname from "./utils/util.js";
import helmet from "helmet";

export const app = express();

/*--EXPRESS--*/
// app.use(
//   session({
//     store: false,
//     secret: "tu_clave_secreta",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
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

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));

/*--PASSPORT--*/

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/*--COOKIES--*/
app.use(cookieParser());
// app.use(morgan("dev"));
app.use(addLogger);

//Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion de Art Focus",
      description: "una descripcion",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
export const specs = swaggerJsdoc(swaggerOptions);

//Helmet
app.use(helmet());
// Router
router(app);

app.use(handleError);
