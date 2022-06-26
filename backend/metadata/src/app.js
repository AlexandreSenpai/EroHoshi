const express = require("express");
const routes = require("./routes/routes.js")

const app = express(); 

app.use(express.json({
    type: ["application.json"]
}))

app.use(routes);

module.exports = app;
