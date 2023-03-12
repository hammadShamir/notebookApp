// Database Connections
const connectToMongo = require("./db");
connectToMongo();
// SERVER SETUP
const express = require("express")
const cors = require("cors")
const app = express();
const port = 8000;
// MIDDLEWARE
app.use(express.json());
app.use(cors());
// Available ROUTES
app.use("/api/auth/createuser", require("./Routes/Auth/register"));
app.use("/api/auth/accesstoken", require("./Routes/Auth/login"));
app.use("/api/auth/getuser", require("./Routes/Auth/user"));
app.use("/api/notes", require("./Routes/Notes/fetchNotes"));
app.use("/api/notes", require("./Routes/Notes/addNotes"));
app.use("/api/notes", require("./Routes/Notes/updateNote"));
app.use("/api/notes", require("./Routes/Notes/deleteNote"));
// RUN SERVER
if (process.env.NODE_ENV === 'production') {
    const path = require("path")
    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
app.listen(port, () => {
    console.log("Server Started at 8000 Port");
})
