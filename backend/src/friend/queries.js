const getFriends = "SELECT * FROM hiredfriends";
const getFriendsById = "SELECT * FROM hiredfriends WHERE friend_id = $1";

const getFreeFriends = `
WITH FreeFriends AS (
  SELECT
    hf.friend_id
  FROM
    HiredFriends hf
  WHERE
    NOT EXISTS (
      SELECT 1
      FROM
        WorkSchedule ws
      WHERE
        ws.friend_id = hf.friend_id
        AND ws.data = $1
    )
)
SELECT *
FROM FreeFriends ff
JOIN HiredFriends hf ON ff.friend_id = hf.friend_id;
`;
const checkFriendExist = "SELECT * FROM hiredfriends WHERE name = $1 AND phone = $2";
const addFriend = "INSERT INTO hiredfriends (name, phone) VALUES ($1, $2)";
const inviteToDate = `WITH new_meeting AS (  INSERT INTO Meeting (date) VALUES ($1) RETURNING meeting_id, date
),
FreeFriends AS (  SELECT hf.friend_id
  FROM HiredFriends hf  WHERE hf.friend_id = $2
    AND NOT EXISTS (      SELECT 1
      FROM WorkSchedule ws      WHERE ws.friend_id = hf.friend_id
        AND ws.data = $1    )
),inserted_data AS (
  INSERT INTO FriendsHiredForDate (client_id, friend_id, meeting_id)  SELECT
    $3,    ff.friend_id,
    nm.meeting_id  FROM
    FreeFriends ff  JOIN new_meeting nm ON true
  RETURNING hireD_id)
INSERT INTO WorkSchedule (data, friend_id, hireD_id)SELECT nm.date, $3, id.hireD_id
FROM inserted_data id JOIN new_meeting nm ON true;`;

const inviteToEvent = `
WITH new_event AS (  INSERT INTO Events (name, date) VALUES ('Some Event', $1) RETURNING event_id, date
),FreeFriends AS (
  SELECT hf.friend_id  FROM HiredFriends hf
  WHERE hf.friend_id = $2    AND NOT EXISTS (
      SELECT 1      FROM WorkSchedule ws
      WHERE ws.friend_id = hf.friend_id        AND ws.data = $1
    )),
inserted_data AS (
  INSERT INTO FriendsHiredForEvent (client_id, friend_id, event_id)  SELECT
    $3,    ff.friend_id,
    ne.event_id  -- Тут використовуємо event_id  
	FROM
    FreeFriends ff  JOIN new_event ne ON true
  RETURNING hireP_id)
INSERT INTO WorkSchedule (data, friend_id, hireP_id)SELECT ne.date, $2, id.hireP_id
FROM inserted_data id JOIN new_event ne ON true;`

module.exports = {
    getFriends,
    getFriendsById,
    checkFriendExist,
    addFriend,
    getFreeFriends,
    inviteToDate,
    inviteToEvent,
};