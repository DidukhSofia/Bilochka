const getClients = "SELECT * FROM clients";
const getClientsById = "SELECT * FROM clients WHERE client_id = $1";
const checkClientExist = "SELECT * FROM clients WHERE name = $1 AND phone = $2";
const addClient = "INSERT INTO clients (name, phone) VALUES ($1, $2)";


module.exports = {
    getClients,
    getClientsById,
    checkClientExist,
    addClient
};