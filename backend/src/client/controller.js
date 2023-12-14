const pool = require('../../db');
const queries = require('./queries');

const getClients = (req, res) => {
    pool.query(queries.getClients, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getClientsById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getClientsById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addClient = (req, res) => {
    const { name, phone } = req.body;
    pool.query(queries.checkClientExist, [name, phone], (error, results) => {
        if(results.rows.length) {
            res.send("Friend already exist.")
        }

        pool.query(queries.addClient, [name, phone], (error, results) => {
            if(error) throw error;
            res.status(201).send("Client created successfully");
        })
    });
}


module.exports = {
    getClients,
    getClientsById,
    addClient,
};