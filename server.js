const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

async function connectToDatabase() {
  try {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD,
    );
    const con = await mongoose.connect(DB);
    // LOG
    // console.log(con.connections);
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Database Connection error", error);
  }
}
connectToDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}...`);
});
