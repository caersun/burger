const express = require("express");
const burger = require("../models/burger.js"); // Import the burger model to use its database functions

// Creating a router to define routes for app without creating new app instance
const router = express.Router();

// READ route
router.get("/", (req, res) => {
    burger.selectAll((data) => {
        const viewData = { burgers: data };

        console.log(viewData);

        res.render("index", viewData);
    });
});

// CREATE route
router.post("/api/burgers", (req, res) => {
    const columnNames = ["burger_name", "devoured"];
    const values = [req.body.burger_name, req.body.devoured];

    burger.insertOne(columnNames, values, (result) => {
        res.json({ id: result.insertId }); // Send back the ID
    });
});

// UPDATE route
router.put("/api/burgers/:id", (req, res) => {
    const changes = `devoured = ${req.body.devoured}`;
    const condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.updateOne(changes, condition, (result) => {
        // If no rows changes then ID must not exist, so 404
        if (result.changedRows == 0) {
            return res.status(404).end();
        };

        res.status(200).end();
    });
});

// DELETE route
router.delete("/api/burgers/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.deleteOne(condition, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        };

        res.status(200).end();
    });
});

// Export routes for server.js to use
module.exports = router;