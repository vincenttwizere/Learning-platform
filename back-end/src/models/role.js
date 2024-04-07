// src/models/role.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users',
      });
    }
  }

  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );

  return Role;
};
