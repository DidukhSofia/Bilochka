const pool = require("../../db");
const queries = require("./queries");

const getEvents = (req, res) => {
  pool.query(queries.getEvents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getEventsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getEventsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addEvent = (req, res) => {
  const { name, date } = req.body;
  pool.query(queries.checkEventExist, [name, date], (error, results) => {
    if (results.rows.length) {
      res.send("Event already exist.");
    }

    pool.query(queries.addEvent, [name, date], (error, results) => {
      if (error) throw error;
      res.status(201).send("Client created successfully");
    });
  });
};

const addWeekend = (req, res) => {
  const { friend_id, date } = req.body;

  pool.query(
    {
      text: queries.addToWeekend,
      values: [friend_id, date],
    },
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        const leaveId = results.rows[0]?.leave_id;

        if (!leaveId) {
          res.send("Leave already exists.");
          return;
        }

        pool.query(
          {
            text: queries.addToSchedule,
            values: [friend_id, date, leaveId],
          },
          (error, results) => {
            if (error) {
              console.error("Error executing query:", error);
              res.status(500).send("Internal Server Error");
            } else {
              res.status(201).send("Weekend created successfully");
            }
          }
        );
      }
    }
  );
};

const getAllWeekends = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAllWeekends, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
}

module.exports = {
  getEvents,
  getEventsById,
  addEvent,
  addWeekend,
  getAllWeekends,
};
