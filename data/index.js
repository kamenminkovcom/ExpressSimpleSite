(function(data){
    let seedData = require('./seedData')
    let db = require('./db')

    data.getNoteCategories = (next) => {
        db.getDb((err, db) => {
            if(err){
                next(err, null)
            }else{
                db.notes.find().sort().toArray((err, results) => {
                    if(err){
                        next(err, null)
                    } else {
                        next(null, results)
                    }
                })
            }
        })
    }

    data.insertCategory = (categoryName, next) => {
        db.getDb((err, db) => {
            if(err){
                next(err)
            } else {
                let category = null
                data.getCategoryByName(categoryName, (err, result) => {
                    if (err){
                        console.log(err)
                    } else{
                        category = result
                        if(category.length == 0){
                            category = {
                                name: categoryName,
                                notes : []
                            }
                            db.notes.insert(category, (err) => {
                                if(err){
                                    next(err)
                                } else {
                                    next(null)
                                }
                            })
                        } else {
                            console.log("This category already exists!")
                        }
                    }
                })

            }
        })
    }

    data.getCategoryByName = (categoryName, next) => {
        db.getDb((err, db) => {
            if(err){
                next(err, null)
            } else {
                db.notes.find({name: categoryName}).sort().toArray((err, results) => {
                    if(err){
                        next(err, null)
                    } else{
                        next(null, results)
                    }
                })
            }
        })
    }

    //seeding initial data into the Data Base
    (function () {
        db.getDb((err, db) => {
            if(err){
                console.log('Cannot seed the Data Base ' + err)
            } else {
              db.notes.count((err, count) => {
                  if(err){
                      console.log('Cannot get the count of notes')
                  } else {
                      if (count == 0){
                          seedData.initialCategories.forEach(note => {
                              db.notes.insert(note, (err) => {
                                  if(err){
                                      console.log('Failed to insert item into the Data Base')
                                  } else  {
                                      console.log('Data was seeded successfully!')
                                  }
                              })
                          })
                      }
                  }
              })
            }
        })
    })()

})(module.exports)