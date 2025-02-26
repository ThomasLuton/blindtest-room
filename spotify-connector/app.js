import {environment} from "./environments/secrets.js";
import express from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from 'path';
import querystring from "querystring";


var clientId = environment.clientId;
var clientSecret = environment.clientSecret;
var redirectURI = environment.redirectURI;
var port = environment.port;
var frontURL = environment.frontURL;
var stateKey = 'spotify_auth_state';
var app = express();
var corsOptions = {
    origin: environment.cors,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
    .use(cookieParser())
    .use(bodyParser.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, environment.apiSecret, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const states = new Set()
app.post('/send-state',authenticateToken, function (req, res,next){
    states.add(req.body.state)
    res.sendStatus(204);
})

app.get('/callback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = null;
    states.forEach((value)=> {
        if (value === state){
            storedState = value;
        }
    })

    if (state === null || storedState === null) {
        res.redirect(frontURL  + '?' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    }else {
        states.delete(state);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirectURI,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect(frontURL + '?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect(frontURL + '?' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }

})

console.log("Listening on port " + port);
app.listen(port);
