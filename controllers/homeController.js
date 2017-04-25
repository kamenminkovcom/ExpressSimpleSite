(function (homeController) {
    let data = require('../data')

    homeController.init = function (app) {
        app.get('/', (req, res) => {
            data.getNoteCategories((err, results) => {
                res.render('index',
                    {title: 'Landing on the Moon', message: 'One little step for man, one giant leap for mankind.',
                        error: err, categories: results})
            })
        })

        app.get('/history', (req, res) => {
            data.getCategoryByName('History', (err, results) => {
                console.log(results)
            })
        })

        app.post('/setCategory', (req, res) => {
            let categoryName = req.body.newCategory
            data.insertCategory(categoryName, (err) => {
                if(err){
                    console.log(err)
                } else {
                    console.log("Data inserted successfully")
                }
            })

        })
    }

})(module.exports)