const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome'
    })
})
app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);

        } else {
            res.json({
                message: "post send",
                authData
            })
        }
    })

})

app.post('/api/login', (req, res) => {
        //mock uesr
        const user = {
            id: 1,
            username: "sandip",
            email: 'sandip@123'
        }
        jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
            res.json({
                token
            })
        })

    })
    //format of taoken
    //authrization bearer 

//varify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined 
    if (typeof bearerHeader !== 'undefined') {
        //splict at the space
        const bearer = bearerHeader.split(' ');
        //get token from arry
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();

    } else {
        //forbidden
        res.sendStatus(403);
    }

}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))