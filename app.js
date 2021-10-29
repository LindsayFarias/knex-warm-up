const express = require('express');

const app = express();
const port = process.env.port || 3000;
const knex = require('knex')(require('./knexfile')[process.env.node_env||'development']);

app.unsubscribe(express.json());

app.get('/movies', (req, res) => {
    knex
        .select('*')
        .from('movies')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({
            message: 'The data you are looking for could not be found. Please try again'
        }))
});

app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});