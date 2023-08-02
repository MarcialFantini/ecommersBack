import express from "express";
import { pool } from "./libs/pg";
import bodyParser from "body-parser";
import { setUpRoutes } from "./routes/setUpRoutes";

const fecha = async () => {
  console.log((await pool.query("SELECT NOW() as now")).rows[0]);
};

fecha();

const App = express();
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

const port = 5000;

setUpRoutes(App);

App.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
