import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export let persist = process.env.PERSISTENCE;
export let port = process.env.PORT;
export let pass = process.env.PASS;
export let passSession = process.env.SECRET_SESSION_STORAGE;
export let idGithub = process.env.CLIENT_ID_GITHUB;
export let secretGithub = process.env.CLIENT_SECRET_GITHUB;
export let idGoogle = process.env.CLIENT_ID_GOOGLE;
export let secretGoogle = process.env.CLIENT_SECRET_GOOGLE;
export let secretKey = process.env.SECRET_KEY;
export let emailAdmin = process.env.EMAIL_ADMIN;
export let passAdmin = process.env.PASS_ADMIN;
