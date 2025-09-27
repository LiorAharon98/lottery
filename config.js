const cors = require("cors")

require("dotenv").config();

const setServerConfiguration = (app, express) => {
  

  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
};
module.exports = setServerConfiguration;
