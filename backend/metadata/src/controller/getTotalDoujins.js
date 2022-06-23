const db = require("../../firebase/db.js")

async function getTotalDoujins(req, res) {

    // get the document doujins from section metadata
    const collection = db.collection("metadata").doc("doujins"); 
    // read the document
    const doujins = await collection.get();  

    // return the data from document (in this case, the amount of doujins in database)
    if (!doujins.exists) {
        return res.send("There's nothing here")
    } else { 
        return res.json({
            "amount of doujins": doujins.data()
        })
    }
}

module.exports = getTotalDoujins;
