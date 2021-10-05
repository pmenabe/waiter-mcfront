'use strict'

const Sequelize = require('sequelize')
const UserModel = require('./User')
const MicroAppModel = require('./MicroApp')
const MicroAppBundleModel = require('./MicroAppBundle')
const { DATABASE } = require('../config')

/**
 * Connect Sequelize to database
 */
const sequelize = new Sequelize(
  DATABASE.NAME, 
  DATABASE.USER, 
  DATABASE.PASS, {
    host: DATABASE.HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
)

const User = UserModel(sequelize, Sequelize)
const MicroApp = MicroAppModel(sequelize, Sequelize)
const MicroAppBundle = MicroAppBundleModel(sequelize, Sequelize)

User.hasMany(MicroApp)
User.hasMany(MicroAppBundle)
MicroAppBundle.belongsTo(MicroApp);
MicroAppBundle.belongsToMany(User, { through: 'users_micro_app_bundles', as: "users", unique: false })

sequelize.sync({ force: false })

module.exports = {
  User,
  MicroApp,
  MicroAppBundle
}
