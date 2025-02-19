import {environment} from "./environments/secrets.js";
import express from 'express'
var port = environment.port
var app = express();

app.get('/test', function (req, res){
    res.send({
        accessToken: "access",
        refreshToken: "refresh"
    })
})

console.log("Listening on port " + port);
app.listen(port);
