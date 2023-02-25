const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRoute");
const LotteryRoute = require("./routes/LotteryRoute");
// const createLottery = require("./createLottery");
const app = express();
const serverConfig = require("./config");
console.log("sd")
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI ||"mongodb+srv://liors-database:lior.ah980@cluster0.iybrzvm.mongodb.net/lottery?retryWrites=true&w=majority");
serverConfig(app, express);
app.use("/lottery", UserRoute);
app.use("/lottery", LotteryRoute);
// const handleCreateLottery = async () => {
//   await createLottery();
// };
// handleCreateLottery();
app.listen( process.env.PORT || 8000);
