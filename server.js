const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const Model = require('./Model/TBdatas.js');

const mysqlConfig = {
    host:'localhost',
    user:'root',
    password:'!qaz@wsx',
    database:'tieba'
};

app.prepare().then(() => {
    const server = express()

    server.get('/p/:id', (req, res) => {
        const actualPage = '/post'
        const queryParams = {
            title: req.params.id
        }
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/data/tygp', (req, res) => {
        Model.getTyGp.then((json) => {
            res.json(json);
        }).catch( (err) => {
            throw err
        });
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})