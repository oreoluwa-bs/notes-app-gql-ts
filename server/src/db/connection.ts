import accessEnv from "@root/helpers/accessEnv";
import { connect } from "mongoose";

const DB_URL = accessEnv("DB_URL");

const databaseConnection = connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Connected to DB at ${DB_URL}`);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`💀 Error`, err.message);
  });

export default databaseConnection;
