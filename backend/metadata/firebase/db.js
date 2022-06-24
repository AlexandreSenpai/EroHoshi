const { initializeApp, cert, applicationDefault } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

applicationDefault()

const db = getFirestore();

module.exports = db;

