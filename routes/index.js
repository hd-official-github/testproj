const express = require('express')

const agencyRoute = require('./agency.route')
const loginRoute = require('./login.route')
const router = express.Router()

const allRoutes = [


    {
        path: '/',
        route: agencyRoute
    },
    {
        path: '/login',
        route: loginRoute
    }
]

allRoutes.forEach((res) => {
    router.use(res.path, res.route)
})
module.exports = {
    router
}