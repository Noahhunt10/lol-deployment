require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path')

const { SERVER_PORT } = process.env || 4545;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Build } = require("./models/userBuilds");
const { Item } = require("./models/item");
const { register, login } = require("./controllers/authControl");
const {
  addBuild,
  addItems,
  getUserBuilds,
  deleteBuild,
} = require("./controllers/buildControl");
const { isAuthenticated } = require("./middleware/isAuthorized");
const { getUsername } = require("./controllers/userController");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")))


User.hasMany(Build);
Build.belongsTo(User);
Build.hasMany(Item);
Item.belongsTo(Build);

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/build", isAuthenticated, addBuild);
app.post("/api/items", addItems);
app.get("/api/username/:userId", getUsername);
app.get("/api/user-builds/:userId", getUserBuilds);
app.delete("/api/delete/:buildId", deleteBuild);

sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on Port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
