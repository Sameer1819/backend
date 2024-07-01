const express = require('express')

const app = express()


function homePage (req, res){
    res.send("Welcome to Homepage")
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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


app.post('/user/signup', (req, res) => {
    const { email, password } = req.body;

    if(email == 'sameer@gmail.com' && password == 'sameer'){
        res.send("Welcome Admin");
    }
    else{
        res.send("Access Denied");
    }
})



app.listen(8080, () => {
    console.log("Server is listening...")
})



