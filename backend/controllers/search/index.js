const admin = require('firebase-admin');

if(admin.apps.length === 0){
    admin.initializeApp();
}

const db = admin.firestore()

module.exports = {
    search: async (req, res) => {

        const query = req.query.q;
        const page = req.query.page || 1;
        const sort = req.query.sort || 'recent';

        const tags = query.split(" ");

        const sort_opt = {
            recent: 'created_date',
            popular: 'score'
        }
        
        if(query === undefined){
            return res.status(400).json({
                error: 'You must provide a doujinshi identifier.'
            })
        }

        const start_at = page > 1 ? page * 20 - 20 : 0;
        const start_after = page * 20;

        const records = await db.collection('doujins')
                                .where('tags_to_search', 'array-contains-any', tags)
                                .orderBy(sort_opt[sort], 'desc').get()

        const record_list = records.docs.slice(start_at, start_after).map(item => {
            const data = item.data();
            return {
                id: data.id,
                title: data.title, 
                lang:  data.language ? data.language : data.languages[0], 
                cover: data.images[0]
            }
        });
        
        return res.status(200).json({
            doujins: record_list,
            total_pages: Math.ceil(records.docs.length / 20),
            total_results: records.docs.length,
            sort: sort || 'recent'
        });
    }
}