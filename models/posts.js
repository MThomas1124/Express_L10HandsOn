'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    PostId: {
      type: DataTypes.INTEGER(5).UNSIGNED, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true  
    },
    PostTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PostBody: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 'false'
    }
  }, {
    return: 'posts'
  });
};
