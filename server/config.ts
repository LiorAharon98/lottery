import cors = require('cors');
require("dotenv").config();

const setServerConfiguration = (app: any, express: any) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
};
export = setServerConfiguration;
