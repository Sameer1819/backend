const express = require('express')

const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: true}))


function homePage (req, res){
    res.send("Welcome to Homepage")
}

app.get('/', homePage )

app.get('/user/:userId', (req, res) => {

    let query = req.query;
    let pathparams = req.params;

    let object = {
        query: query,
        path: pathparams
    }

    res.send(object)
} )

app.post('/signup', (req, res) => {

    const body = req.body;

    

    res.send("<h1>You are signed up</h1>")
})


app.listen(8080, () => {
    console.log("Server is listening...")
})



