const express = require("express");
const bodyparser = require("body-parser");
const remove = require("./routes/remove");
const cors = require("cors");
const app = express();
// const db = require("./config/keys").mongoURI;
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger-output.json");

//middleware
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

app.use(bodyparser.json());
app.use(cors());
//passport jwt
// app.use(passport.initialize());
// mongoose.connect(db);


app.use("/remove", remove);
// app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port", { port }));