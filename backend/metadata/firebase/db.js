const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")


const serviceAccount = require("../../eroneko-c890a77e5039.json")

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = db;

