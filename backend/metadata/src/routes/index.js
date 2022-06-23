const express = require("express")
const doujins = require("./Routes")

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({ título: "O Alexandre está me fazendo de escravo"})
    })

    app.use(
        express.json(),
        doujins
    )
}

module.exports = routes; 