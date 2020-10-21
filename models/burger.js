// Import the ORM to create functions that will interact with the database
// const connection = require("../config/connection.js");
const orm = require("../config/orm.js");

const tableName = 'burgers';

const burger = {
    selectAll: (cb) => {
        orm.selectAll(tableName, (res) => { // TODO: What is res - a result or response?
            cb(res); // TODO: Go back to class vid - what are we doing calling res back?
        });
    },

    insertOne: (cols, vals, cb) => {
        orm.insertOne(tableName, cols, vals, (res) => {
            cb(res);
        });
    },

    updateOne: (objColVals, condition, cb) => {
        orm.updateOne(tableName, objColVals, condition, (res) => {
            cb(res);
        });
    },

    deleteOne: (condition, cb) => {
        orm.deleteOne(tableName, condition, (res) => {
            cb(res);
        });
    }
};

// Export the database functions for the controller 
module.exports = burger;