'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get full_name() {
      return `${this.first_name} ${this.last_name}`;
    }
    static associate(models) {
      // define association here
      Member.hasMany(models.Item);
      Member.belongsToMany(models.Item, { through: models.Transaction });
      Member.hasMany(models.Transaction);
    }
  };
  Member.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Username Tidak Boleh Kosong'
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Email Tidak Boleh Kosong'
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'First Name Tidak Boleh Kosong'
        }
      }
    },
    last_name: DataTypes.STRING,
    emoney: DataTypes.INTEGER,
    membership_status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (member, option) => {
        if(!member.last_name){
          member.last_name = member.first_name
        }
      }
    },
    sequelize,
    modelName: 'Member',
  });
  Member.beforeCreate((member, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(member.password, salt);
    member.password = hash;
    if (!member.emoney) member.emoney = 0;
  });
  return Member;
};