(function(db){
    let mongo = require('mongodb')
    const URL = 'mongodb://localhost:27017/simplesitedb'
    let theDb = null

    db.getDb = (next) => {
        if (!theDb){
            mongo.MongoClient.connect(URL, (err, db) =>{
                if(err) {
                    next(err, null)
                }
                else{
                    theDb= {
                        db,
                        notes: db.collection('notes')
                    }
                    next(null, theDb)
                }
            })
        } else{
            next(null, theDb)
        }
    }

})(module.exports)
