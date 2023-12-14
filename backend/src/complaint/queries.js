const getComplaints = "SELECT * FROM complaints";
const addComplaint = `INSERT INTO Complaints (text, complaint_date, client_id, friend_id)
VALUES ($1, $2, $3, $4);
`

module.exports = {
    getComplaints,
    addComplaint
}
