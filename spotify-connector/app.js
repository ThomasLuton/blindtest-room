import {environment} from "./environments/secrets.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from "cors";
var port = environment.port
var app = express();

var corsOptions = {
    origin: environment.cors,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, environment.apiSecret, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

app.get('/test', authenticateToken, function (req, res){
    res.send({
        accessToken: "access",
        refreshToken: "refresh"
    })
})

console.log("Listening on port " + port);
app.listen(port);
