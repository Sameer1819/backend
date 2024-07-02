const express = require('express')
const mysql = require('mysql2')

const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: true}))


function homePage (req, res){
    res.send("Welcome to Homepage")
}

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Sameer@123",
    database: "development"
})

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

app.post('/signup', async(req, res) => {

    const body = req.body;
    const email = body.email;
    const password = body.password;
    
    connection.query(
        `SELECT user_id FROM users WHERE email="${email}"`, (err, result, fields) => {
            if(result.length === 0){
                res.send("No user found you can signup, email: "+email+" password: "+password)
            }
            else{
                res.send("User exists go login")
            }
        }
    );

})


app.listen(8080, () => {
    console.log("Server is listening...")
})

