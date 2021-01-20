const admin = require('firebase-admin');

if(admin.apps.length === 0){
    admin.initializeApp();
}

const db = admin.firestore()

module.exports = {
    newest: async (req, res) => {
        
        var last_id = req.query.last_id ? parseInt(req.query.last_id) : undefined;

        if(last_id == undefined){
            const max_id_doc = await db.collection('summary').doc('counters').get()
            var last_id = await max_id_doc.data().max_id;
        }
        
        const records = await db.collection('doujins')
                                .orderBy('id', 'desc')
                                .startAt(last_id)
                                .limit(18)
                                .get()

        const record_list = records.docs.map(item => {
            const data = item.data();
            return {
                id: data.id,
                title: data.title, 
                lang:  data.language ? data.language : data.languages[0], 
                cover: data.images[0]
            }
        });
        
        return res.status(200).json({
            doujins: record_list
        });
    },
    most_viewed: async (req, res) => {
        const records = await db.collection('doujins')
                                .orderBy('views', 'desc')
                                .limit(5).get()
        const record_list = records.docs.map(item => {
            const data = item.data();
            return {
                id: data.id,
                title: data.title, 
                lang: data.languages[0], 
                cover: data.images[0]
            }
        })

        return res.status(200).json({
            doujins: record_list
        });
    }
}