const express = require("express");
const cors = require("cors");
const friendsRoutes = require('./src/friend/routes');
const clientRoutes = require('./src/client/routes')
const eventRoutes = require('./src/event/routes')
const giftRoutes = require('./src/gift/routes')
const complaintRoutes = require('./src/complaint/routes')

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello");
})

app.use('/api/friends', friendsRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/complaints', complaintRoutes);




app.listen(port, () => console.log(`app listening on port ${port}`))