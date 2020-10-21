// Import MySQL connection.
const connection = require("../config/connection.js");

// Helper function for SQL syntax
// Takes in a number and returns a string of the number of question marks
function createValueMarks(num) {
    let array = [];

    for (let i = 0; i < num; i++) {
        array.push("?");
    }

    return array.toString();
}

// Helper function for SQL syntax
// Takes in object and converts object's key/value pairs to SQL syntax
// Doesn't the latest version of MySQL take in objects at ? and translate them on their site? I think I did this for previous hw
function objectToSQL(object) {
    const array = [];

    for (let key in object) {
        let value = object[key]; // e.g. for object: { key: value }

        if (Object.hasOwnProperty.call(object, key)) { // TODO: What is this line doing?
            if (typeof value === "string" && value.indexOf(" ") >= 0) { // If value is a string and has spaces, then wrap the value in single-quotes
                value = `'${value}'`;
            }
        }

        array.push(`${key}=${value}`);
    }
};

// ORM object
const orm = {
    selectAll: (tableInput, cb) => {
        const query = `SELECT * FROM ??`;

        connection.query(query, [tableInput], (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    insertOne: (table, cols, vals, cb) => {
        const columns = cols.toString();
        const questionMarks = createValueMarks(vals.length);
        const query = `INSERT INTO ${table} (${columns}) VALUES (${questionMarks})`;

        connection.query(query, vals, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        })
    },

    updateOne: (table, objColVals, condition, cb) => {
        // const changes = objectToSQL(objColVals);
        // const translated = objectToSQL(condition);
        const query = `UPDATE ${table} SET ${objColVals} WHERE ${condition}`;

        console.log(query);

        connection.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    deleteOne: (table, condition, cb) => {
        const query =  `DELETE FROM ${table} WHERE ${condition}`;

        console.log(query);

        connection.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}

// Export the orm object
module.exports = orm;