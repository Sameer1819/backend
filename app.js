const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const { STATUS_CODES } = require('http')

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

app.use((req, res, next) => {
    if(req.method == "POST"){
        const { email, password } = req.body;
        if(password.length < 8){
            res.status(400).send({
                status: "FAILED",
                reason: "Password length make greater than 8"
            })
        }
        else{
            next()
        }
    }
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

app.post('/signup',  async(req, res) => {

    const body = req.body;
    const email = body.email;
    const password = body.password;

    connection.query(
        `SELECT user_id FROM users WHERE email="${email}"`, async (err, result, fields) => {
            if(result.length === 0){
                console.log("No user found you can signup, email: "+email+" password: "+password)
                const hashedPw = await bcrypt.hash(password, 10);


                connection.query(
                    `INSERT INTO users (email, password) VALUES ("${email}", "${hashedPw}")`, (err, result, fields) => {
                        if(err){
                            res.status(400).send("Failed to Insert")
                        }
                        else{
                            res.status(201).send({
                                status: "SUCCESS",
                                data: "User Created"
                            });
                        }
                    }
                )
            }
            else{
                res.send("User exists go login");
            }
        }
    );

})

app.post('/login', async(req, res) =>{
    const body=req.body
    const email=body.email
    const password=body.password

    connection.query( `SELECT user_id FROM users WHERE email="${email}"`, async (err, result, fields) => {
        if(result.length == 0){
            console.log("No user found you can signup, email: "+email+" password: "+password)
            res.status(400).send({
                "STATUS":"FAILED",
                "MESSAGE":"Email not Found, Please create account first"
            })
        }
        //get password from DB
        //compare
        else{
            connection.query( `SELECT password FROM users WHERE email="${email}"`, async (err, result, fields) => {
                console.log(result)
                const pwd=result[0].password
                bcrypt.compare(password, pwd, function(err, result) {
                    if(result==true){
                        res.status(200).send({
                            "STATUS":"SUCCESS",
                            "MESSAGE":"LOGGED IN SUCCESSFULLY"
                        })
                    }
                    else{
                        res.status(403).send({
                            "STATUS":"FAILED",
                            "MESSAGE":"PASSWORD ENTERED IS WRONG"
                        })
                    }
                });
            })
         
        }
    })
})

//{
//    "email": "testUser@gmail.com",
//1    "newEmail": "newmail@gmail.com"
//1}
app.post('/change-email', ) //for amar

app.post('/reset-password') //for sameer


app.listen(8080, () => {
    console.log("Server is listening...")
})

