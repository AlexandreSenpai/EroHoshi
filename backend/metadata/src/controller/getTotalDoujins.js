const db = require("../firebase/db.js")

async function getTotalDoujins(req, res) {

    // get the document "doujins" in the section "metadata"
    const collection = db.collection("metadata").doc("doujins"); 
    // read the document
    const doujins = await collection.get(); 
    const amountOfDoujins = doujins.data()

    // return the data from document (in this case, the amount of doujins in database)
    if (!doujins.exists) {
        return res
        .status(404)
        .send("There's nothing here")
    } else { 
        return res
        .status(200)
        .json({
            "total": Number(amountOfDoujins.total)
        })
    }
}

module.exports = getTotalDoujins;
