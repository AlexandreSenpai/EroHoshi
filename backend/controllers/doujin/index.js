const admin = require('firebase-admin');

if(admin.apps.length === 0){
    admin.initializeApp();
}

const db = admin.firestore()

module.exports = {
    doujin: async (req, res) => {

        const doujin_id = req.query.id;
        
        if(doujin_id === undefined){
            return res.status(400).json({
                error: 'You must provide a doujinshi identifier.'
            })
        }

        const record = db.collection('doujins').doc(doujin_id);
        const data = await record.get()
        
        // record.update({
        //     views: admin.firestore.FieldValue.increment(1)
        // })
        
        return res.status(200).json(data.data());
    },
    random: async (req, res) => {
        const record = await db.collection('summary').doc('counters').get();
        const total_doujins = record.data().doujins;

        var random_id = Math.floor(Math.random() * total_doujins)

        var choosed_doujin = await db.collection('doujins').doc(`${random_id}`).get()
        while(choosed_doujin.exists === false){
            random_id = Math.floor(Math.random() * total_doujins)
            choosed_doujin = await db.collection('doujins').doc(`${random_id}`).get()
        }

        return res.status(200).json(choosed_doujin.data());
    },
    like: async (req, res) => {
        const doujin_id = req.query.doujin_id;
        const uid = req.query.uid;

        console.log(doujin_id, uid)

        const record = await db.collection('doujins').doc(doujin_id);
        const info = await (await record.get()).data();
        const likes = info.likes.length + 1;
        const dislikes = info.dislikes.length;

        record.update({
            likes: [...info.likes, uid],
            score: Math.ceil((likes * 100) / (likes + dislikes)) 
        })

        return res.status(200).send({});
    },
    can_like: async (req, res) => {
        const doujin_id = req.query.doujin_id;
        const uid = req.query.uid;

        const record = await db.collection('doujins').doc(doujin_id);
        const info = await (await record.get()).data();

        return res.status(200).send({
            can_like: info.likes.indexOf(uid) === -1 ? true : false
        });
    },
    total_doujins: async (req, res) => {
        const records = await db.collection('summary')
                                .doc('counters')
                                .get()
        
        return res.status(200).json({
            total_doujins: await records.data().doujins
        })
    }
}