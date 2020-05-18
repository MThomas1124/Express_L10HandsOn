'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Posts" to table "users"
 *
 **/

var info = {
    "revision": 4,
    "name": "user_post",
    "created": "2020-04-10T01:05:04.135Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "Posts",
        {
            "type": Sequelize.STRING,
            "field": "Posts",
            "_allowNull": false,
            get "allowNull"() {
                return this["_allowNull"];
            },
            set "allowNull"(value) {
                this["_allowNull"] = value;
            },
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
