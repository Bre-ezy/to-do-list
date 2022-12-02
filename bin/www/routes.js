export function createRoutes(app) {

    //Index page
    app.get('/', (req, res) => {

        res.render('pages/index')
    })

    //About page
    app.get('about', (req, res) => {
        res.render('')
    })
}