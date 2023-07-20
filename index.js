const fs = require('fs');
const path = require("path");
const { URL, URLSearchParams } = require('url');
const express = require("express");
const session = require("express-session");
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 80;

app.use(session({
    secret: 'roberto',
    resave: true,
    saveUninitialized: true
}))

app.get('/api/session/:id', (req, res)=>{
    fs.readFile(path.resolve(__dirname, 'sessions.json'), async(err, data)=>{
        if (err){
            console.log("Error al leer el archivo JSON", err);
            res.status(500);
            res.send("Something went wrong...");
        }
        try{
            const sessions = JSON.parse(data);
            let foundTimer = await sessions[req.params.id] | null;
            if (!foundTimer){
                res.status(404);
                res.send("Session file not found");
            }

            res.send(JSON.stringify(foundTimer));
        } catch (err) {
            console.log("Error al leer el archivo JSON", err);
            res.status(500);
            res.send("Something went wrong...");
        }
    })
})

app.get('/api/getSession', (req, res)=>{
    res.json({ sessionId: req.sessionID });
})

app.get('/api/getTimestamp', (req, res)=>{
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "sessions.json"), 'utf-8'));
    if (data[req.query.sessionId] == undefined){
        res.status(404);
        res.send("Not found");
    } else {
        res.send(data[req.query.sessionId]); 
    }
})

app.get('/api/restartTimestamp', async (req, res)=>{
    let data = fs.readFileSync(path.resolve(__dirname, "sessions.json"), 'utf-8');
    let modJson = JSON.parse(data);
    modJson[req.query.sessionId] = "0";
    fs.writeFileSync(path.resolve(__dirname, "sessions.json"), JSON.stringify(modJson));
    res.send("OK");
})
app.post('/api/session/:id', (req, res)=>{
    const id = req.sessionID;
    let timestamp = req.query.timestamp | null;
    let newJson = `"${id}":"${req.query.timestamp}"`;
    let actualJson = fs.readFileSync(path.resolve(__dirname, "sessions.json"), 'utf-8');
    if (actualJson == ""){
        fs.writeFileSync(path.resolve(__dirname, "sessions.json"), "{" + newJson + "}");
    } else {;
        let modJson = actualJson.replace("}", "");
        modJson = modJson + "," + newJson + "}";
        fs.writeFileSync(path.resolve(__dirname, "sessions.json"), modJson);
    }

    /*if (!timestamp){
        timestamp = 0;
    }
    let newJson;*/
    /* const data = fs.readFileSync(path.resolve(__dirname, "sessions.json"), 'utf-8');
    console.log(data);
    const jsonFormat = JSON.parse(JSON.stringify({[id]:[timestamp]})); */

    const response = JSON.stringify(newJson);
    res.status(201);
    res.send(response);
});

app.use('/', express.static(__dirname + "/web"));
app.get('/', (req, res) =>{
    console.log(req.session);
    res.type('html');
    res.sendFile(path.resolve(__dirname, 'web/index.html'));
})



app.listen(port, ()=>{
    console.log("El servicio eyeHealth se inició correctamente.");
    console.log("El servidor esta escuchando el puerto", port);
})