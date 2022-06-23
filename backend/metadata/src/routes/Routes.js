const express = require("express")
const getTotalDoujins = require("../controller/getTotalDoujins.js")

const router = express.Router(); 

router
    .get("/metadata/doujins/total", getTotalDoujins)

    
module.exports = router; 
