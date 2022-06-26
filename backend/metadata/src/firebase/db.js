const { initializeApp, cert, applicationDefault } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const envName = require("../var.js")

const serviceAccount = require("../../../eroneko-c890a77e5039.json")

initializeApp({
    credential: envName == "local" ? cert(serviceAccount) : applicationDefault()
})

const db = getFirestore()

module.exports = db;

