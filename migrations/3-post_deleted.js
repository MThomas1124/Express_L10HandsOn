'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "posts"
 *
 **/

var info = {
    "revision": 3,
    "name": "post_deleted",
    "created": "2020-04-09T00:20:30.177Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "posts",
        "Deleted",
        {
            "type": Sequelize.BOOLEAN,
            "field": "Deleted",
            "defaultValue": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
