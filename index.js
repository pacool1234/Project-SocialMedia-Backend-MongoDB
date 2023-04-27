const express = require('express');
const app = express();
require("dotenv").config();
const PORT =  process.env.PORT || 3000;
const { dbConnection } = require('./config/config')

const cors = require('cors');


app.use(express.json())
app.use(cors());
app.use(express.static('./public')) //Necessary to get correct url in frontend

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

dbConnection()



app.listen(PORT, ()=> console.log(`Server started on port ${PORT} with cors() enabled`));
