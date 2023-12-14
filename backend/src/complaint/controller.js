const pool = require('../../db');
const queries = require('./queries');

const getComplaints = (req, res) => {
    pool.query(queries.getComplaints, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addComplaint = (req, res) => {
    const { text, date, client_id, friend_id } = req.body;
    // Отримати gift_id за назвою подарунка
    pool.query(queries.addComplaint, [text, date, client_id, friend_id], (error, results) => {
        if (error) {
            console.error('Error adding complaint:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Complaint added successfully');
        }
    });
    
}

module.exports = {
    getComplaints,
    addComplaint,
}