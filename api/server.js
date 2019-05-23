const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb');

let db = null;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    db = client.db('church_songs');
})

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/songs', (req, res) => {
    db.collection('songs').find().toArray((err, results) => {
        res.send(results);
        res.end();
    });
});

app.post('/songs', (req, res) => {
    db.collection('songs').save(req.body, (err, results) => {
        if (err) {
            res.end();
            return console.log(err);
        } else {
            db.collection('songs').find().toArray((err, results) => {
                res.send(results);
                res.end();
            });
        }
    });
});

app.delete('/songs/:id', (req, res) => {
    const id = req.params.id;
    db.collection('songs').remove({ '_id': ObjectId(id) }, (err, obj) => {
        if (err) {
            res.end();
            return console.log(err);
        } else {
            db.collection('songs').find().toArray((err, results) => {
                res.send(results);
                res.end();
            });
        }
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
