import express from "express";

const App = express();

const port = 5000;

App.listen(port, () => {
  console.log(`http://localhost:${port}/about`);
});
