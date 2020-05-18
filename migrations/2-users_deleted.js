'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: [users, users]
 * addColumn "Deleted" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "users_model_deleted",
    "created": "2020-04-08T16:22:42.863Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "posts",
            {
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "PostTitle": {
                    "type": Sequelize.STRING,
                    "field": "PostTitle"
                },
                "PostBody": {
                    "type": Sequelize.STRING,
                    "field": "PostBody"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "allowNull": true,
                    "field": "UserId"
                },

                "userUserId": {
                    "type": Sequelize.INTEGER,
                    "field": "userUserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    }
];

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
