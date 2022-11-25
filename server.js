const express       = require("express");
const cors          = require("cors");
const bodyParser    = require("body-parser");
const cookieParser  = require("cookie-parser");

//APP
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/Pages', express.static(__dirname+'/Pages'));

//LOAD .ENV
require("dotenv").config();

//DATABASE
const Database = require('./App/Model');
Database.sequelize.sync();

//PAGES
app.get('/', (req, res) => res.sendFile(__dirname+'/src/Index/index.html'));

require("./routes/usuarios.routes")(app);

//PORT
app.listen(3030, () => {
    console.log('Servidor online');
});