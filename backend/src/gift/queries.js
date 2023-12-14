const getGifts = "SELECT * FROM gifts";
const addGiftToFriend = `INSERT INTO GiftsFromClientToFriend (client_id, friend_id, gift_id, present_date)
VALUES (
  $1,
  $2,
  (SELECT gift_id FROM Gifts WHERE name = $3),
  $4
);`;
const getGiftById = `SELECT GiftsFromClientToFriend.present_id, Clients.name AS client_name, Gifts.name AS gift_name, GiftsFromClientToFriend.present_date AS date
FROM GiftsFromClientToFriend
JOIN Gifts ON GiftsFromClientToFriend.gift_id = Gifts.gift_id
JOIN Clients ON GiftsFromClientToFriend.client_id = Clients.client_id
WHERE GiftsFromClientToFriend.friend_id =  $1;`;
const deleteGiftById = `DELETE FROM GiftsFromClientToFriend WHERE present_id = $1;`;


module.exports = {
    getGifts,
    addGiftToFriend,
    getGiftById,
    deleteGiftById,
}
