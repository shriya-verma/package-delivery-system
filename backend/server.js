const express = require("express");

// const db = require("./config/db");
const PORT = process.env.PORT || 8000;

// Connect to database

const app = express();

app.use(express.json());// allows to handle raw json 
app.use(express.urlencoded({ extended: false }));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
}); //handling cors issue

// Routes   
app.use("/users", require("./routes/userRoutes")); //-- endpoints of API
app.use("/parcel", require("./routes/parcelRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Package Delivery System" });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}...`));
