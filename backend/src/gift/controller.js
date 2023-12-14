const pool = require('../../db');
const queries = require('./queries');

const getGifts = (req, res) => {
    pool.query(queries.getGifts, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addGiftToFriend = (req, res) => {
    const { client_id, friend_id, gift_name, present_date } = req.body;

    // Отримати gift_id за назвою подарунка
    pool.query(queries.addGiftToFriend, [client_id, friend_id, gift_name, present_date], (error, results) => {
        if (error) {
            console.error('Error adding gift to friend:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Gift added to friend successfully');
        }
    });
    
}

const getGiftById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getGiftById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const deleteGift = (req, res) => {
    const presentId = parseInt(req.params.id);
  
    pool.query(queries.deleteGiftById, [presentId], (error, results) => {
      if (error) {
        console.error('Error deleting gift:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Gift deleted successfully');
      }
    });
  };

module.exports = {
    getGifts,
    addGiftToFriend,
    getGiftById,
    deleteGift,
};