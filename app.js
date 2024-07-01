const express = require('express')

const app = express()


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


app.listen(8080, () => {
    console.log("Server is listening...")
})



