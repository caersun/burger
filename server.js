const express = require("express"); 
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 9000;

const app = express();

// Serve satic content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes
const burgerRoutes = require("./controllers/burgers_controller.js");

app.use(burgerRoutes);

app.listen(PORT, () => {
    console.log(`Server is live @ http://localhost:${PORT}`);
});