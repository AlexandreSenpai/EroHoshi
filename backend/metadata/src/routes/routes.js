const { Router } = require("express")
const getTotalDoujins = require("../controller/getTotalDoujins.js")

const router = Router(); 

router
    .get("/metadata/doujins/total", getTotalDoujins)
    .get("/healthcheck", (req, res) => {
        res
        .status(200)
        .send("Okay")
    })
    
module.exports = router; 
