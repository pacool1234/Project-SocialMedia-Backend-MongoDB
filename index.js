const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public")); //Necessary to get correct url in frontend

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));

app.use(typeError);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

dbConnection();

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} with cors() enabled`)
);
