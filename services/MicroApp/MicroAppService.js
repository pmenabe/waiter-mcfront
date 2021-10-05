'use strict'

const { MicroApp, MicroAppBundle, User } = require('../../models')

const getUser = async function(id) {
  let user = await User.findByPk(id)
  return user
}

const getMicroApp = async function(app) {
  let microApp = await MicroApp.findOne({ where: { name: app } })
  return microApp
}

const getMicroAppBundle = async function(microAppId, userId) {
  let microAppBundle = await MicroAppBundle.findAll({ 
    subQuery: false,
    attributes: {
      exclude: ['userId']
    },
    where: { 
      microAppId
    },
    include: [
      {
        model: User,
        through: "users_micro_app_bundles",
        as: "users",
        where: {
          id: userId
        }
      },
    ]
  })
  return microAppBundle
}

const getBuiltPath = async function(app, token) {
  let user = await getUser(token)
  if (!user) {
    return { error: 'Built not found' }
  }

  let microApp = await getMicroApp(app)
  if (!microApp) {
    return { error: 'Built not found' }
  }

  let microAppBundle = await getMicroAppBundle(microApp.id, user.id)
  microAppBundle = microAppBundle ? microAppBundle[0] : null
  if (!microAppBundle) {
    return { error: 'Built not found' }
  }

  return { microApp, microAppBundle }
}

module.exports = {
  getBuiltPath
}