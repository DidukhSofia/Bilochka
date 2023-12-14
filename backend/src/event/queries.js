const getEvents = "SELECT * FROM events";
const getEventsById = "SELECT * FROM events WHERE event_id = $1";
const checkEventExist = "SELECT * FROM events WHERE name = $1 AND date = $2";
const addEvent = "INSERT INTO clients (name, date) VALUES ($1, $2)";
const addToWeekend = `INSERT INTO FriendLeaves (friend_id, leave_date)
VALUES ($1, $2)
ON CONFLICT (leave_id) DO NOTHING
RETURNING leave_id;`;
const addToSchedule = `INSERT INTO WorkSchedule (data, friend_id, leave_id, hireP_id, hireD_id)
VALUES ($2, $1, $3, null, null);`
const getAllWeekends = "select * from friendleaves where friend_id = $1"


module.exports = {
    getEvents,
    getEventsById,
    checkEventExist,
    addEvent,
    addToWeekend,
    addToSchedule,
    getAllWeekends,
};