const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors())
app.use(express.json())

const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router')

MongoClient.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology: true})
    .then((client)=> {
        const db = client.db('sequencerPresets');
        const presetsCollection = db.collection('presets');
        const presetsRouter = createRouter(presetsCollection);
        app.use('/api/presets/', presetsRouter);
    })

app.listen(9000, ()=>{
    console.log(`Listening on port 9000`)
})