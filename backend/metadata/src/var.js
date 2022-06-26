require("dotenv").config()

const envName = process.env.NODE_ENV || "qa";

module.exports = envName